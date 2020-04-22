const bcrypt = require('bcrypt');
const { BCRYPT_SALT_ROUNDS } = require('../../common/config');

class UserService {
  constructor(repository, mapper) {
    this.repo = repository;
    this.mapper = mapper;
  }

  async authenticateUser(userData) {
    const user = await this.repo.getUserByLogin(userData.login);
    if (user) {
      const match = await bcrypt.compare(userData.password, user.password);
      if (match) {
        return { id: user.id, login: user.login };
      }
    }
    return null;
  }

  async getAllUsers() {
    const users = await this.repo.getAllUsers();
    return users.map(user => this.mapper.toResponse(user));
  }

  async getUserById(id) {
    const user = await this.repo.getUserById(id);
    return this.mapper.toResponse(user);
  }

  async createUser(data) {
    const hash = await bcrypt.hash(data.password, BCRYPT_SALT_ROUNDS);
    const user = await this.repo.createUser({ ...data, password: hash });
    return this.mapper.toResponse(user);
  }

  async updateUser(data) {
    const user = await this.repo.updateUser(data);
    return this.mapper.toResponse(user);
  }

  async deleteUser(id) {
    return await this.repo.deleteUser(id);
  }
}

module.exports = new UserService(
  require('./userRepository'),
  require('./userMapper')
);
