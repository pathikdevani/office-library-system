const router = require('express').Router();
const { body } = require('express-validator/check');

const validator = require('../../modules/validator.module');
const request = require('./users.request');
const auth = require('../../modules/auth.module');
const successResponse = require('../../response/success.response');

router.post(
  '/signin',
  validator([body('email').isEmail(), body('password').isLength({ min: 5 })]),
  (req, res) => {
    request.signin(req, res);
  },
);

router.get('/isSingedIn', auth, (req, res) => {
  successResponse(res, { data: req.user });
});

router.get('/signout', auth, (req, res) => {
  req.logout();
  successResponse(res, { data: 'ok' });
});

module.exports = router;
