const router = require('express').Router();

const request = require('./books.request');
const errorResponse = require('../../response/error.response');

router.get(
  '/',
  (req, res) => {
    request.getAllBooks((err, books) => {
      if (err) {
        errorResponse(res, (err.status || 500), {
          code: err,
        });
      } else {
        res.send({
          data: books,
        });
      }
    });
  },
);

router.get(
  '/:id',
  (req, res) => {
    if (req.params.id) {
      request.getBookById(req.params.id)
        .then((book) => {
          res.send({
            data: book,
          });
        });
    } else {
      errorResponse(res, 500, {
        code: 'NO_BOOK_ID',
      });
    }
  },
);

router.post('/:id', (req, res) => {
  if (!req.body.quantity) {
    errorResponse(res, 500, {
      code: 'NO_QUANTITY',
    });
  }
  const { id } = req.params;
  request.updateBook(id, { isbn: req.body.quantity })
    .then(() => {
      return res.send('ok');
    })
    .catch((err) => {
      errorResponse(res, (err.status || 500), {
        code: err,
      });
    });
});

router.post(
  '/',
  (req, res) => {
    if (!req.body.isbn) {
      errorResponse(res, 500, {
        code: 'NO_ISBN',
      });
    }

    if (!req.body.quantity) {
      errorResponse(res, 500, {
        code: 'NO_QUANTITY',
      });
    }

    request.getBookDetailFromAPI(req.body.isbn)
      .then((googleBookDetail) => {
        return request.insertBook(request.getBookDetailFromAPI(req.body.isbn, googleBookDetail, req.body.quantity));
      })
      .then((savedBook) => {
        return res.send(savedBook);
      })
      .catch((err) => {
        errorResponse(res, (err.status || 500), {
          code: err,
        });
      });
  },
);

module.exports = router;
