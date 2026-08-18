
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
    ref: 'Game' 
  }]
}, { 
  timenstamps: true 
});

module.exports = mongoose.model('Cart', CartSchema);
