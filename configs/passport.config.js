const User = require('../models/user.model');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


passport.serializeUser((user, next) => {
  next(null, user.id);
});

passport.deserializeUser((id, next) => {
  User.findById(id)
    .then(user => next(null, user))
    .catch(next)
});


passport.use('auth-local', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
}, (username, password, next) => {
  User.findOne({$or:[{ email: username }, { nickName: username }]})
    .then(user => {
      if (!user) {
        next(null, false, 'Username o Password incorrecto, revisa!')
      } else {
        return user.checkPassword(password)
          .then(match => {
            if (!match) {
              next(null, false, 'Username o Password incorrecto, revisa!')
            } else {
              next(null, user)
            }
          })
      }
    })
    .catch(error => next(error))
}));
