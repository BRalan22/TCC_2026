
const CartService = require('../services/CartService');

class CartController {
  
 
  async getCart(req, res) {
    try {

      const usuarioId = req.usuario.id; 
      
      const carrinho = await CartService.buscarCarrinho(usuarioId);
      
      return res.status(200).json(carrinho);
    } catch (erro) {
      return res.status(500).json({ erro: 'Erro ao buscar seu carrinho.' });
    }
  }

  
  async add(req, res) {
    try {
      const usuarioId = req.usuario.id;
      const { jogoId } = req.body;

      if (!jogoId) {
        return res.status(400).json({ erro: 'O ID do jogo é obrigatório.' });
      }

      const carrinhoAtualizado = await CartService.adicionarItem(usuarioId, jogoId);
      
      return res.status(200).json({
        mensagem: 'Jogo adicionado ao carrinho!',
        carrinho: carrinhoAtualizado
      });
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async remove(req, res) {
    try {
      const usuarioId = req.usuario.id;
      const { jogoId } = req.params;

      const carrinhoAtualizado = await CartService.removerItem(usuarioId, jogoId);
      
      return res.status(200).json({
        mensagem: 'Jogo removido do carrinho.',
        carrinho: carrinhoAtualizado
      });
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }
}

module.exports = new CartController();