const express = require('express');
const router = express.Router({ mergeParams: true });
const reviews = require('../controllers/reviews.controller');
const secure = require('../middlewares/secure.mid');

router.post('/', secure.isAuthenticated , reviews.create);
router.get('/user/:id',secure.isAuthenticated, reviews.user)
router.get('/', secure.isAuthenticated, reviews.list);

module.exports = router;
