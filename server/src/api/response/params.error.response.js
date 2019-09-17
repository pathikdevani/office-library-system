const httpStatus = require('http-status');
const error = require('./error.response');

module.exports = (res, data) => {
  error(res, httpStatus.UNPROCESSABLE_ENTITY, {
    code: 'params',
    data,
  });
};
