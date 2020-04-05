module.exports = class User {
  constructor({ id = require('uuid')(), name, login, password } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }
};
