module.exports = (res, status, options = {}) => {
  const { type, data, code } = options;
  res.status(status).send({
    type,
    code,
    data,
  });
};
