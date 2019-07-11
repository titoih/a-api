const express = require('express');
const router = express.Router();

const secure = require('../middlewares/secure.mid');
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/user/:id', secure.isAuthenticated, authController.user);

router.post('/logout', secure.isAuthenticated, authController.logout);

module.exports = router;  