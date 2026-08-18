// routes/checkoutRoutes.js
const express = require('express');
const router = express.Router();
const CheckoutController = require('../controllers/CheckoutController');
const authMiddleware = require('../middlewares/verificarToken');

// Rota protegida
router.post('/', authMiddleware, CheckoutController.process);

module.exports = router;