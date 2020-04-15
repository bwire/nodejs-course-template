class UserRepository {
  constructor(model) {
    this.model = model;
  }

  async getAllUsers() {
    return await this.model.find({});
  }

  async getUserById(id) {
    const user = await this.model.findOne({ _id: id });
    console.log('user by id', user);
    return user;
  }

  async createUser(data) {
    return this.model.create(data);
  }

  async updateUser(data) {
    return this.model.update({ _id: data.id }, data);
  }

  async deleteUser(id) {
    return await this.model.deleteOne({ _id: id });
  }
}

module.exports = new UserRepository(require('./userModel'));
