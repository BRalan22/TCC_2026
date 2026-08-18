
const AuthService = require('../services/AuthService');

class AuthController {
  

  async register(req, res) {
    try {
      const { nome, email, senha } = req.body;


      if (!nome || !email || !senha) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
      }


      const novoUsuario = await AuthService.criarUsuario({ nome, email, senha });

      return res.status(201).json({
        mensagem: 'Usuário registrado com sucesso!',
        usuario: novoUsuario
      });

    } catch (erro) {
      return res.status(500).json({ erro: 'Erro interno ao registrar usuário.', detalhe: erro.message });
    }
  }

  
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ erro: 'E-mail e senha são obrigatórios.' });
      }

     
      const resultado = await AuthService.autenticar(email, senha);

      if (!resultado) {
        return res.status(401).json({ erro: 'Credenciais inválidas.' });
      }

      return res.status(200).json({
        mensagem: 'Login realizado com sucesso!',
        token: resultado.token,
        usuario: resultado.usuario
      });

    } catch (erro) {
      return res.status(500).json({ erro: 'Erro interno ao realizar login.', detalhe: erro.message });
    }
  }
}

module.exports = new AuthController();