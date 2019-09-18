/* eslint-disable prefer-promise-reject-errors */
const router = require('express').Router();

const request = require('./issues.request');
const errorResponse = require('../../response/error.response');
const Books = require('../books/books.model');

router
  .get(
    '/',
    (req, res) => {
      request.getAllIssues(req, res)
        .then((issues) => {
          res.send({
            data: issues,
          });
        });
    },
  );

router
  .get(
    '/:id',
    (req, res) => {
      if (req.params.id) {
        request.getIssueById(req.params.id)
          .then((issue) => {
            res.send({
              data: issue,
            });
          });
      } else {
        errorResponse(res, 404, {
          code: 'NO_ISSUE_ID',
        });
      }
    },
  );

router
  .post(
    '/',
    (req, res) => {
      const { bookId, employeeId, dueDate } = req.body;
      if (!bookId) {
        errorResponse(res, 500, {
          code: 'NO_BOOK_ID',
        });
      }

      // if (!employeeId) {
      //   errorResponse(res, 500, {
      //     code: 'NO_EMPLOYEE_ID',
      //   });
      // }

      if (!dueDate) {
        errorResponse(res, 500, {
          code: 'NO_DUE_DATE',
        });
      }


      Books
        .findById(bookId)
        .then((book) => {
          if (book) {
            return Promise.resolve;
          }
          return Promise.reject({
            msg: 'BOOK_NOT_FOUND',
          });
        })
        .then(() => {
          return request.insertIssue({
            bookId,
            employeeId,
            dueDate: new Date(dueDate),
            issuedAt: new Date(),
            isReturned: false,
          });
        })
        .then((savedIssue) => {
          return Books
            .findOneAndUpdate({
              _id: bookId,
            }, {
              issueId: savedIssue._id,
            })
            .then(() => {
              return savedIssue;
            });
        })
        .then(savedIssue => res.send(savedIssue))
        .catch((err) => {
          errorResponse(res, 500, {
            code: err,
          });
        });
    },
  );

router
  .patch(
    '/:id/return',
    (req, res) => {
      const { id } = req.params;

      request.getIssueById(id)
        .then((issue) => {
          if (issue) {
            return Promise.resolve;
          }
          return Promise.reject({
            msg: 'ISSUE_NOT_FOUND',
          });
        })
        .then(() => {
          return request.findOneAndUpdate({
            _id: id,
          }, {
            isReturned: true,
            returnedAt: new Date(),
          });
        })
        .then((updatedIssue) => {
          return Books
            .findOneAndUpdate({
              _id: updatedIssue.bookId,
            }, {
              issueId: null,
            })
            .then(() => {
              return updatedIssue;
            });
        })
        .then(savedIssue => res.send(savedIssue))
        .catch((err) => {
          errorResponse(res, 500, {
            code: err,
          });
        });
    },
  );

module.exports = router;
