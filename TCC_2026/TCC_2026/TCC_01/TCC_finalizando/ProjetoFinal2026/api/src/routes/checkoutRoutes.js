const express = require('express');
const router = express.Router();
const CheckoutController = require('../controllers/CheckoutController');

router.post('/finalizar', CheckoutController.processar);

module.exports = router;