class AuthService {
  constructor(jswt, { JWT_SECRET_KEY }) {
    this.jwt = jswt;
    this.key = JWT_SECRET_KEY;
  }

  async createJwt(payload) {
    return this.jwt.sign(payload, this.key);
  }
}

module.exports = new AuthService(
  require('jsonwebtoken'),
  require('../../../common/config')
);
