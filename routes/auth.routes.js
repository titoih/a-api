const express = require('express');
const router = express.Router();
const secure = require('../middlewares/secure.mid');
const uploadCloud = require('../configs/db.cloudinary.js');
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/edit', secure.isAuthenticated, uploadCloud.single('avatar'), authController.doEdit);
router.get('/user/:id', secure.isAuthenticated, authController.user);

router.get('/logout', secure.isAuthenticated, authController.logout);

module.exports = router;  