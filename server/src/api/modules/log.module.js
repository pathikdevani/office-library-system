const PrettyError = require('pretty-error');

const pe = new PrettyError();


module.exports = {
  n: (...args) => {
    console.log(...args);
  },
  e: (err) => {
    console.log(pe.render(err));
  },
};
