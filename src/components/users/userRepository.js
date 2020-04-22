class UserRepository {
  constructor(model) {
    this.model = model;
  }

  async getAllUsers() {
    return await this.model.find({});
  }

  async getUserById(id) {
    return await this.model.findOne({ id });
  }

  async getUserByLogin(login) {
    return await this.model.findOne({ login });
  }

  async createUser(data) {
    return this.model.create(data);
  }

  async updateUser(data) {
    return this.model.update({ id: data.id }, data);
  }

  async deleteUser(id) {
    return (await this.model.deleteOne({ id })).deletedCount;
  }
}

module.exports = new UserRepository(require('./userModel'));
