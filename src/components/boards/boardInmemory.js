class BoardRepository {
  constructor(model) {
    this.model = model;
    this.boards = [
      new this.model({ title: 'Development' }),
      new this.model({ title: 'Sales' })
    ];
  }

  async getAllBoards() {
    return this.boards;
  }

  async getBoardById(id) {
    return this.boards.find(board => board.id === id);
  }

  async createBoard(data) {
    if (data.title) {
      const board = new this.model({ ...data });
      this.boards.push(board);
      return board;
    }
    return undefined;
  }

  async updateBoard(board) {
    const idx = this.boards.findIndex(b => b.id === board.id);
    if (idx !== -1) {
      const b = this.boards[idx];
      b.title = board.title;
      b.columns = board.columns;
      return b;
    }
    return undefined;
  }

  async deleteBoard(id) {
    const idx = this.boards.findIndex(board => board.id === id);
    if (idx !== -1) {
      this.boards.splice(idx, 1);
      return id;
    }
    return undefined;
  }
}

module.exports = new BoardRepository(require('./boardModel'));
