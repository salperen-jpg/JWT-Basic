const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const authorizationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('No token');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Not authorized to acces the rouse');
  }
};

module.exports = authorizationMiddleware;
