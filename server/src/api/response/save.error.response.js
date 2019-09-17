const httpStatus = require('http-status');
const error = require('./error.response');

module.exports = (res, data) => {
  error(res, httpStatus.BAD_REQUEST, {
    code: 'save',
    data,
  });
};
