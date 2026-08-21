const mongoose = require('mongoose');
const config = require('../../config');

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);
    console.log('🍃 MongoDB Conectado!');
  } catch (error) {
    console.error('Erro de conexão no MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;