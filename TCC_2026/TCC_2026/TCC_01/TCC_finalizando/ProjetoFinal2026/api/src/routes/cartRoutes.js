const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

router.get('/usuario/:usuarioId', CartController.list);
router.delete('/:id', CartController.remove);

module.exports = router;