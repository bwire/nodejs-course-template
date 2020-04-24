const parseBearerToken = require('parse-bearer-token').default;
const authService = require('../components/auth/authService');
const { AuthenticationError } = require('./errors');

const isAuthenticated = (req, res, next) => {
  const token = parseBearerToken(req);
  console.log('token', token);
  if (token) {
    const verified = authService.verifyJwt(token);
    if (verified) {
      return next();
    }
  }
  const error = new AuthenticationError('Access token is missing or invalid');
  return next(error);
};

module.exports = { isAuthenticated };
