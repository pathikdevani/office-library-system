const PrettyError = require('pretty-error');

const pe = new PrettyError();


module.exports = {
  n: (...args) => {
    // eslint-disable-next-line no-console
    console.log(...args);
  },
  e: (err) => {
    // eslint-disable-next-line no-console
    console.log(pe.render(err));
  },
};
