const httpStatus = require('http-status');
const error = require('./error.response');

module.exports = (res, data) => {
  error(res, httpStatus.INTERNAL_SERVER_ERROR, {
    code: 'internal',
    data,
  });
};
