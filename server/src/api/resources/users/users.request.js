const passport = require('passport');

const signinErrorResponse = require('../../response/signin.error.response');
const successResponse = require('../../response/success.response');

class UsersRequest {
  static signin(req, res, next) {
    passport.authenticate('local', (err, user) => {
      if (err) {
        return signinErrorResponse(res, { message: 'internal error' });
      }
      if (!user) {
        return signinErrorResponse(res, { message: 'user not found' });
      }
      req.login(user, (error) => {
        if (error) {
          return signinErrorResponse(res, { message: 'internal error' });
        }
        req.session.save();
        return successResponse(res, { data: user });
      });
    })(req, res, next);
  }
}

module.exports = UsersRequest;
