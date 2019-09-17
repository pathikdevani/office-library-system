const httpStatus = require('http-status');
const response = require('./response');

module.exports = (res, options = {}) => {
  const { code, data } = options;
  response(res, httpStatus.OK, {
    type: 'success',
    code,
    data,
  });
};
