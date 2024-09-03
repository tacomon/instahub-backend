const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/data', homeController.getHomeData);

module.exports = router;
