class AuthService {
  constructor(jswt, { JWT_SECRET_KEY }) {
    this.jwt = jswt;
    this.key = JWT_SECRET_KEY;
  }

  async createJwt(payload) {
    return this.jwt.sign(payload, this.key);
  }

  async verifyJwt(token) {
    try {
      this.jwt.verify(token, this.key);
      return true;
    } catch (e) {
      return false;
    }
  }
}

module.exports = new AuthService(
  require('jsonwebtoken'),
  require('../../common/config')
);
