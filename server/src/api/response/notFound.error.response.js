const httpStatus = require('http-status');
const error = require('./error.response');

module.exports = (res, data) => {
  error(res, httpStatus.NOT_FOUND, {
    code: 'notFound',
    data,
  });
};
