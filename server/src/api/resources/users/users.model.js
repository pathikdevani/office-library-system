const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    disable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

schema.methods = {
  toDataObject() {
    const {
      id, fname, lname, role, disable, email,
    } = this;
    return {
      id,
      fname,
      lname,
      role,
      disable,
      email,
    };
  },
};

schema.statics = {
  signin(email, password) {
    const Model = this;
    return new Promise((resolve, reject) => {
      Model.findOne({ email })
        .exec()
        .then((currentUser) => {
          if (currentUser && !currentUser.disable) {
            bcrypt
              .compare(password, process.env.SALT + currentUser.password)
              .then((is) => {
                if (is) {
                  resolve(currentUser.toDataObject());
                } else {
                  reject();
                }
              })
              .catch(() => {
                reject();
              });
          } else {
            reject();
          }
        })
        .catch(() => {
          reject();
        });
    });
  },
  signup(options) {
    const Model = this;
    const {
      email, password, fname, lname,
    } = options;
    return new Promise((resolve, reject) => {
      Model.findOne({ email })
        .then((currentUser) => {
          if (currentUser) {
            reject();
          } else {
            return bcrypt.hash(password, process.env.SALT);
          }
        })
        .then((hash) => {
          const user = new Model({
            fname,
            lname,
            email,
            password: hash.replace(process.env.SALT, ''),
            disable: false,
            role: 'user',
          });
          return user.save();
        })
        .then((user) => {
          resolve(user.toDataObject());
        })
        .catch(() => {
          reject();
        });
    });
  },
};

const User = mongoose.model('user', schema);
module.exports = User;
