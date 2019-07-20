User = require('../models/user.model.js');

module.exports.list = (req, res, next) => {
  User.find({})
    .then(users => {res.json(users)})
}