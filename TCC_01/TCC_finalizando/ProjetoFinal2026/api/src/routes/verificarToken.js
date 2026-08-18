
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido. Faça login.' });
  }


  const token = authHeader.split(' ')[1];

  try {
   
    const decodificado = jwt.verify(token, 'SEGREDO_AQUI');
    
    
    req.usuario = decodificado; 
    
    return next(); 
  } catch (erro) {
    return res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }
};