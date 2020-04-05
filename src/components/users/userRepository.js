class UserRepository {
  constructor(model) {
    this.model = model;
    this.users = [
      new this.model({ name: 'User1', login: 'User1', password: '12345' }),
      new this.model({ name: 'User2', login: 'User2', password: '12346' })
    ];
  }

  async getAllUsers() {
    return this.users;
  }

  async getUserById(id) {
    return this.users.find(user => user.id === id);
  }

  async createUser(data) {
    const user = new this.model(data);
    this.users.push(user);
    return user;
  }

  async updateUser(data) {
    const idx = this.users.findIndex(user => user.id === data.id);
    if (idx !== -1) {
      this.users[idx] = data;
      return this.users[idx];
    }
    return undefined;
  }

  async deleteUser(id) {
    const idx = this.users.findIndex(user => user.id === id);
    if (idx !== -1) {
      this.users.splice(idx, 1);
      return id;
    }
    return undefined;
  }
}

module.exports = new UserRepository(require('./userModel'));
