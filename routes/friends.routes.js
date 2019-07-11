const express = require('express');
const router = express.Router({ mergeParams: true });
const friend = require('../controllers/friends.controller');
const secure = require('../middlewares/secure.mid');

router.get('/', secure.isAuthenticated, friend.list);
router.post('/', secure.isAuthenticated , friend.create);

module.exports = router;











// const user = require('../middlewares/user.mid');
// router.post('/:userId', secure.isAuthenticated , user.userExist, friend.create);
