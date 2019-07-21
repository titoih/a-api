User = require('../models/user.model.js');

module.exports.list = (req, res, next) => {
  User.find({})
    .sort({ createdAt: -1 })
    .then(users => {res.json(users)})
}