const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  usuarioId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  jogos: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Game', 
    required: true 
  }],
  total: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['APROVADO', 'PENDENTE', 'RECUSADO'], 
    default: 'PENDENTE' 
  },
  metodoPagamento: { 
    type: String, 
    required: true 
  }
}, { 
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Order', OrderSchema);