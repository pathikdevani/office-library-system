const response = require('./response');

module.exports = (res, status, options = {}) => {
  const { code, data } = options;
  response(res, status, {
    type: 'error',
    code,
    data,
  });
};
