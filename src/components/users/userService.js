class UserService {
  constructor(repository, mapper, bcrypt, { BCRYPT_SALT_ROUNDS }) {
    this.repo = repository;
    this.mapper = mapper;
    this.bcrypt = bcrypt;
    this.salt = BCRYPT_SALT_ROUNDS;
  }

  async authenticateUser(userData) {
    const user = await this.repo.getUserByLogin(userData.login);
    if (user) {
      const match = await this.bcrypt.compare(userData.password, user.password);
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
    const hash = await this.bcrypt.hash(data.password, this.salt);
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
  require('./userMapper'),
  require('bcrypt'),
  require('../../common/config')
);
