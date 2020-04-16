class BoardRepository {
  constructor(model) {
    this.model = model;
  }

  async getAllBoards() {
    return await this.model.find({});
  }

  async getBoardById(id) {
    return await this.model.findOne({ id });
  }

  async createBoard(data) {
    return await this.model.create(data);
  }

  async updateBoard(data) {
    return await this.model.update({ id: data.id }, data);
  }

  async deleteBoard(id) {
    return await this.model.findOneAndDelete({ id });
  }
}

module.exports = new BoardRepository(require('./boardModel'));
