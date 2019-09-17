const User = require('./api/resources/users/users.model');
const { users } = require('../package.json');

module.exports = () => {
  if (users) {
    Promise.all(users.map((u) => {
      return User.signup(u)
        .then(() => { })
        .catch(() => { });
    }));
  }
};
