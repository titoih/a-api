const createError = require('http-errors');
const Review = require('../models/review.model');
const Friend = require('../models/friend.model');
const User = require('../models/user.model');

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


module.exports.users = (req, res, next) => {
  Review.find({})
    .populate('resource')
    .populate('user')
    .sort({ createdAt: -1 })
    .then(reviews  => {
      res.json(reviews)
    })
    .catch(next)
}

module.exports.favourites = (req, res, next) => {
  const {reviewId} = req.body;
  console.log(req.body)
  User.findById({ _id: req.user.id})
    .then(user => {
      const arrayFavourites = user.favourites
      if(arrayFavourites.includes(reviewId)){
        next(createError(409, "already in your favourites!"))
      } else {
        User.findByIdAndUpdate({_id:req.user.id}, { $push: { favourites:reviewId }})
          .then(favourite => res.status(201).json(favourite))
      }
    })
    .catch(next)
}