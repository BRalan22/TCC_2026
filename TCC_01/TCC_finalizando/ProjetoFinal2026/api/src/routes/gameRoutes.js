// routes/gameRoutes.js
const express = require('express');
const router = express.Router();
const GamesController = require('../controllers/GamesController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas públicas (qualquer pessoa pode ver a vitrine)
router.get('/', GamesController.index);
router.get('/:id', GamesController.show);

// Rota protegida (Idealmente, você teria um middleware para verificar se é Admin, 
// mas aqui usamos o authMiddleware comum como exemplo)
router.post('/', authMiddleware, GamesController.create);

module.exports = router;