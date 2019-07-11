const createError = require('http-errors');
const User = require('../models/user.model');
const Friend = require('../models/friend.model');

module.exports.create = (req, res, next) => {   
  const { friendId } = req.body;
  if (friendId == req.user.id) {
    next(createError(400, "Same friend user"))
  } else {
    Promise.all([
      User.findById(friendId),
      Friend.findOne({ users: { $all: [req.user.id, friendId]} })
    ]).then(([user, friend]) => {
      if (!user) {
        next(createError(404, "Friend not found"))
      } else if (friend) {
        next(createError(409, "Already exists users relationship"))
      } else {
        friend = new Friend({
          users: [req.user.id, friendId],
          status: 'ok'
        })
        return friend.save()
          .then(friend => res.status(201).json(friend))
      }
    })
    .catch(next)
  }
}

module.exports.list = (req, res, next) => {
  Friend.find({ users: req.user.id })
    .then(friends  => {
      friends = friends.reduce((acc, friendship) => {
        const friend = friendship.users.find((userId) => userId != req.user.id)
        acc.push(friend);
        return acc;
      }, [])
      
      return User.find({ _id : {$in : friends} })
      .populate('users')
      .sort({ createdAt: -1 })
      .then(friends  => {
        res.json(friends)
      })
    })
    .catch(next)
}