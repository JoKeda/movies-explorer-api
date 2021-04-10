require('dotenv').config();
const jwt = require('jsonwebtoken');
const config = require('../config/index');
const { UnauthorizedError } = require('../errors/index');

const jwtSecret = process.env.jwtSecret ?? config.jwtSecret;
const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.includes('Bearer ') ? authorization.split(' ')?.[1] : null;
    if (!token) {
      next(new UnauthorizedError('Нет авторизации'));
    }
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (e) {
    next(new UnauthorizedError('Нет авторизации'));
  }
};

module.exports = authMiddleware;
