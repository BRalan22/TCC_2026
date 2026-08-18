const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');
const authMiddleware = require('../middlewares/authMiddleware');


router.use(authMiddleware);

router.get('/', CartController.getCart);
router.post('/', CartController.add);
router.delete('/:jogoId', CartController.remove);

module.exports = router;