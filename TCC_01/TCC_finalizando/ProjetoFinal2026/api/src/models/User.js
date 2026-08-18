
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nome: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  senha: { 
    type: String, 
    required: true 
  },

  biblioteca: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Game' 
  }]
}, { 
  timestamps: true 
});

module.exports = mongoose.model('User', UserSchema);