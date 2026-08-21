const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  desenvolvedora: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Game', GameSchema);