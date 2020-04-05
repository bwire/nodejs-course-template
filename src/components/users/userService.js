class UserService {
  constructor(repository, mapper) {
    this.repo = repository;
    this.mapper = mapper;
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
    const user = await this.repo.createUser(data);
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
