const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const connect = () => {
  mongoose.set('useCreateIndex', true);
  // Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
  // by default, you need to set it to false.
  mongoose.set('useFindAndModify', false);
  mongoose.connect(process.env.MONGODB, { useNewUrlParser: true });
};

module.exports = connect;
