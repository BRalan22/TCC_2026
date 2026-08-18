const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  usuarioId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    unique: true 
  },
  itens: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Game' // Recomendo nomear como 'Account' se a model for de contas
  }]
}, { 
  timestamps: true // Corrigido
});

module.exports = mongoose.model('Cart', CartSchema);