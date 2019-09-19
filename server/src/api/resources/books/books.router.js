const router = require('express').Router();
const axios = require('axios');

const request = require('./books.request');
const errorResponse = require('../../response/error.response');

function getDetailFromApi(isbn, googleBookApi, quantity) {
  const {
    title, subtitle, description, pageCount, categories, authors, publishedDate, publisher, imageLinks, previewLink, infoLink,
  } = googleBookApi;

  return {
    isbn,
    title,
    subtitle,
    description,
    pageCount,
    categories,
    authors,
    publisher,
    publishedDate,
    imageLinks,
    previewLink,
    infoLink,
    quantity,
  };
}

router.get(
  '/',
  (req, res) => {
    request.getAllBooks(req, res)
      .then((books) => {
        res.send({
          data: books,
        });
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

    axios
      .get(`https://www.googleapis.com/books/v1/volumes?fields=items(volumeInfo)&q=isbn:${req.body.isbn}`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          const { data } = response;

          if (data.items && data.items.length) {
            return data.items[0].volumeInfo;
          }

          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject({
            status: 404,
            code: 'BOOK_NOT_FOUND',
          });
        }

        return Promise.reject(response);
      })
      .then((googleBookDetail) => {
        return request.insertBook(getDetailFromApi(req.body.isbn, googleBookDetail, req.body.quantity));
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
