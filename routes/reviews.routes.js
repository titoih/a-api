const express = require('express');
const router = express.Router({ mergeParams: true });
const reviews = require('../controllers/reviews.controller');
const secure = require('../middlewares/secure.mid');

router.post('/', secure.isAuthenticated , reviews.create);
router.post('/favourites', secure.isAuthenticated , reviews.addFavourites);
router.get('/favourites', secure.isAuthenticated , reviews.ShowFavouriteReviews);
router.get('/user/:id',secure.isAuthenticated, reviews.user);
router.get('/users', secure.isAuthenticated, reviews.users);
router.get('/', secure.isAuthenticated, reviews.list);

module.exports = router;
