Resource = require('../models/resource.model.js');

module.exports.data = (req, res, next) => {
  Resource.find({})
    .then(resources => {res.json(resources)})
}