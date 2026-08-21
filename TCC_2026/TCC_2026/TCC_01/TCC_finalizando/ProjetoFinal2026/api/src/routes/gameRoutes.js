const express = require('express');
const router = express.Router();
const GamesController = require('../controllers/GamesController');

router.get('/', GamesController.index);
router.post('/', GamesController.store);

module.exports = router;