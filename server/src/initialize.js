const User = require('./api/resources/users/users.model');
const { user } = require('../package.json');

module.exports = () => {
  if (user) {
    User.signup(user)
      .then(() => { })
      .catch(() => { });
  }
};
