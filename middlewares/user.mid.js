const createError = require('http-errors');
const User = require('../models/user.model');

module.exports.userExist = (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        throw createError(404, 'User not found')
      } else if (user === req.user.userId){
        throw createError(409, 'Same user')
      } else {
          req.friend = user;
          next();
      }
    })
    .catch(next)
}