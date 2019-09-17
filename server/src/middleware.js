const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const connectMongo = require('connect-mongo');
const LocalStrategy = require('passport-local');
const HttpStatus = require('http-status');

const User = require('./api/resources/users/users.model');

const MongoStore = connectMongo(session);

module.exports = (app) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => {
        if (user && !user.disable) {
          done(null, user.toDataObject());
        } else {
          done(
            {
              status: HttpStatus.UNAUTHORIZED,
              message: 'User does not exits',
            },
            null,
          );
        }
      })
      .catch(() => {
        done({
          status: HttpStatus.UNAUTHORIZED,
          message: 'User does not exist',
        });
      });
  });

  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      (email, password, done) => {
        User.signin(email, password)
          .then((user) => {
            done(null, user);
          })
          .catch((err) => {
            if (err) {
              done(err);
            } else {
              done(null, false);
            }
          });
      },
    ),
  );
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      store: new MongoStore({
        url: process.env.MONGODB,
        touchAfter: 24 * 3600,
      }),
    }),
  );

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(passport.initialize());
  app.use(passport.session());
};
