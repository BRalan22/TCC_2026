const User = require('../models/User');

module.exports = {
  async register(req, res) {
    try {
      const { nome, email, senha } = req.body;
      const userExists = await User.findOne({ email });
      
      if (userExists) {
        return res.status(400).json({ error: 'E-mail já cadastrado.' });
      }

      const user = await User.create({ nome, email, senha });
      return res.status(201).json({ message: 'Usuário criado!', user });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
  },

  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const user = await User.findOne({ email, senha });

      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

      return res.json({ message: 'Login realizado!', user });
    } catch (error) {
      return res.status(500).json({ error: 'Erro no servidor' });
    }
  }
};