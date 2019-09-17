const authResponse = require('../response/auth.error.response');

const auth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    authResponse(res, { message: 'not authenticated' });
  } else {
    next();
  }
};

module.exports = auth;
