const CheckoutService = require('../services/CheckoutService');

class CheckoutController {
  
  // POST /api/checkout
  async process(req, res) {
    try {
      const usuarioId = req.usuario.id;
      const dadosPagamento = req.body.pagamento; 

      if (!dadosPagamento) {
        return res.status(400).json({ erro: 'Os dados de pagamento são obrigatórios.' });
      }

      // O Service fará a cobrança, limpará o carrinho e adicionará os jogos à biblioteca do usuário
      const pedido = await CheckoutService.processarCompra(usuarioId, dadosPagamento);
      
      return res.status(200).json({
        mensagem: 'Pagamento aprovado! Os jogos já estão na sua biblioteca.',
        pedidoDeCompra: pedido
      });

    } catch (erro) {
      // Se o cartão for recusado ou der algum erro de saldo
      return res.status(402).json({ 
        erro: 'Falha ao processar o pagamento.', 
        motivo: erro.message 
      });
    }
  }
}

module.exports = new CheckoutController();