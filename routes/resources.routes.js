const express = require('express');
const router = express.Router();
const resource = require('../controllers/resources.controller');

router.get('/', resource.data);

module.exports = router;