const Conta = require('../models/Conta');

module.exports = {
  async processar(req, res) {
    try {
      const { id, status } = req.body;
      const contaAtualizada = await Conta.findByIdAndUpdate(
        id, 
        { status: status || 'EM_ANALISE' }, 
        { new: true }
      );
      return res.json({ message: 'Status atualizado com sucesso!', conta: contaAtualizada });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao processar alteração.' });
    }
  }
};