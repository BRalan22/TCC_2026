
const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  titulo: { 
    type: String, 
    required: [true, 'O titulo é obrigatorio'],
    trim : true
  },
  descricao: { 
    type: String, 
    required: [true,' A descrição é obrigatoria' ]  
  },
  preco: { 
    type: Number, 
    required: [true, 'O preço é obrigatorio'],
    min:1
  },
  categoria: { 
    type: String, 
    required: [true,'a categoria é obrigatoria']
  },
  imagemUrl: { 
    type: String,
    required: [true, 'A URL  da imagem de capa é obrigatoria']
  },
  tralier:{
    type: String,
    required:[true,' Tralier do jogo é obrigatorio']
  },
  desenvolvedora: { 
    type: String,
    required: [true,'a desenvolvedora é obrigatorio']
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Game', GameSchema);