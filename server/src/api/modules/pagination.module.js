const { body } = require('express-validator/check');

const validator = require('./validator.module');
const successResponse = require('../response/success.response');
const internalResponse = require('../response/internal.error.response');
const log = require('../modules/log.module');

const rules = [
  body('page').isNumeric(),
  body('size').isNumeric(),
];

module.exports = {
  validator: validator(rules),
  rules,

  paginate: (res, model, {
    page, size, query = {}, options = {},
  }) => {
    model.paginate(query, { page, limit: size, ...options })
      .then((data) => {
        successResponse(res, {
          data: {
            items: data.docs,
            total: data.total,
            page: data.page,
            pages: data.pages,
          },
        });
      })
      .catch((e) => {
        log.e(e);
        internalResponse(res);
      });
  },
};
