const { validationResult } = require('express-validator/check');

const paramsResponse = require('../response/params.error.response');

const result = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return paramsResponse(res, {
      params: errors.array(),
    });
  }
  next();
};

const validator = (checks) => {
  return [...checks, result];
};

module.exports = validator;
