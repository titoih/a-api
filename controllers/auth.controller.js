const User = require('../models/user.model');

const createError = require('http-errors');
const passport = require('passport');

module.exports.register = (req, res, next) => {
  const { email, nickName } = req.body;
  User.findOne( {$or: [{ email: email }, { nickName: nickName}] } )
    .then(user => {
      if (user) {

        if(user && user.email == email) {
          throw createError(409, 'Email is already registered')
        }
        else if((user && user.nickName == nickName)){
          throw createError(409, 'Nickname is already registered')
        }

      } else {
        return new User(req.body).save();
      }
    })
    .then(user => res.status(201).json(user))
    .catch(next)
  
}
module.exports.login = (req, res, next) => {
  console.log(req.body)
  passport.authenticate('auth-local', (error, user, message) => {
    if (error) {
      next(error);
    } else if (!user) {
      next(createError(400, message));
    } else {
      req.login(user, (error) => {
        if (error) {
          next(error)
        } else {
          res.status(201).json(user);
        }
      })
    }
  })(req, res, next);
}

module.exports.user = (req, res, next) => {
  User.findById( { _id: req.params.id } )
  .populate('user')
  .sort({ createdAt: -1 })
  .then(user => {
    if (!user) {
      throw createError(404, 'User doesn\'t exist')
    } else {
     res.json(user)

    }
  })
  .catch(next)
}


module.exports.logout = (req, res, next) => {
  req.logout();
  res.status(204).json();
}