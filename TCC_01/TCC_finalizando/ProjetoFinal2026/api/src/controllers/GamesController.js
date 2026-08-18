
const GamesService = require('../services/GamesService');

class GamesController {
  

  async index(req, res) {
    try {
     
      const filtros = req.query;
      
      const jogos = await GamesService.listarTodos(filtros);
      
      return res.status(200).json(jogos);
    } catch (erro) {
      return res.status(500).json({ erro: 'Erro ao buscar a lista de jogos.' });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      
      const jogo = await GamesService.buscarPorId(id);
      
      if (!jogo) {
        return res.status(404).json({ erro: 'Jogo não encontrado.' });
      }
      
      return res.status(200).json(jogo);
    } catch (erro) {
      return res.status(500).json({ erro: 'Erro ao buscar detalhes do jogo.' });
    }
  }


  async create(req, res) {
    try {
      const dadosDoJogo = req.body;
      
      const novoJogo = await GamesService.cadastrarJogo(dadosDoJogo);
      
      return res.status(201).json({
        mensagem: 'Jogo adicionado ao catálogo com sucesso!',
        jogo: novoJogo
      });
    } catch (erro) {
      return res.status(400).json({ erro: 'Erro ao cadastrar o jogo.', detalhe: erro.message });
    }
  }
}

module.exports = new GamesController();