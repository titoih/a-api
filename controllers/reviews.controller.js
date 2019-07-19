const createError = require('http-errors');
const Review = require('../models/review.model');
const Friend = require('../models/friend.model');

module.exports.create = (req, res, next) => {
  const review = new Review ({
    user: req.user.id,
    resource: req.body.resource,
    rate: req.body.rate,
    comment: req.body.comment
  });
  review.save()
    .then(review => res.status(201).json(review))
    .catch(next);
}

module.exports.list = (req, res, next) => {
  const { kind } = req.query;
  Friend.find({users: req.user.id})
    .then(friends  => {
      friends = friends.reduce((acc, friendship) => {
        const friend = friendship.users.find((userId) => userId != req.user.id)
        acc.push(friend);
        return acc;
      }, [])

      return Review.find({ user : {$in : friends} })
        .populate('resource')
        .populate('user')
        .sort({ createdAt: -1 })
        .then(reviews  => {
          reviews = kind ? reviews.filter(review => review.resource.kind === kind) : reviews
          res.json(reviews)
        })
    })
    .catch(next)
  
}

module.exports.user = (req, res, next) => {
  Review.find( { user: req.params.id } )
  .populate('user')
  .populate('resource')
  .sort({ createdAt: -1 })
  .then(userReviews => {
    if (!userReviews) {
      throw createError(404, 'User doesn\'t exist')
    } else {
     res.json(userReviews)

    }
  })
  .catch(next)
}