// middlewares/roleMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const verifyRole = (role) => {
  return async (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const usuario = await User.findById(decoded.id);

      if (usuario.rol !== role) {
        return res.status(403).json({ msg: 'Access denied' });
      }

      req.user = usuario;
      next();
    } catch (err) {
      res.status(401).json({ msg: 'Token is not valid' });
    }
  };
};

module.exports = verifyRole;
