const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  titulo: { 
    type: String, 
    required: [true, 'O título do anúncio é obrigatório.'],
    trim: true 
  },
  descricao: { 
    type: String, 
    required: [true, 'A descrição é obrigatória.'] 
  },
  preco: { 
    type: Number, 
    required: [true, 'O preço é obrigatório.'],
    min: [0, 'O preço não pode ser negativo.'] 
  },
  plataforma: { 
    type: String, 
    required: [true, 'A plataforma (ex: Steam, Riot Games, Epic) é obrigatória.'] 
  },
  categoria: { 
    type: String, 
    required: true // ex: Valorant, GTA V, League of Legends, Fortnite
  },

  // STATUS: Essencial para contas únicas (evita que duas pessoas comprem a mesma conta)
  status: {
    type: String,
    enum: ['disponivel', 'reservado', 'vendido'],
    default: 'disponivel'
  },

  // Informações extras da conta (opcional)
  atributos: {
    nivel: { type: Number },
    rank: { type: String }, // ex: Imortal, Radiante, Desafiante
    skinsQuantidade: { type: Number, default: 0 }
  },

  // CREDENCIAIS DA CONTA (Login/Senha que o comprador receberá)
  // `select: false` impede que o login e senha apareçam nas buscas públicas do site!
  credenciais: {
    login: { type: String, select: false },
    senha: { type: String, select: false },
    emailOriginal: { type: String, select: false } // Para recuperar caso dê problema
  },

  // Fotos/Screenshots do inventário ou da conta
  imagens: [{ 
    type: String 
  }]

}, { 
  timestamps: true // Cria automaticamente os campos createdAt e updatedAt
});

// Exporta como 'Game' para bater com o ref: 'Game' do seu Cart.js
module.exports = mongoose.model('Game', GameSchema);