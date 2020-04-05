class BoardService {
  constructor(repository, mapper) {
    this.repo = repository;
    this.mapper = mapper;
  }

  async getAllBoards() {
    const boards = await this.repo.getAllBoards();
    return boards.map(board => this.mapper.toResponse(board));
  }

  async getBoardById(id) {
    const board = await this.repo.getBoardById(id);
    return this.mapper.toResponse(board);
  }

  async createBoard(data) {
    const board = this.repo.createBoard(data);
    return this.mapper.toResponse(board);
  }

  async updateBoard(data) {
    const board = this.repo.updateBoard(data);
    return this.mapper.toResponse(board);
  }

  async deleteBoard(id) {
    return await this.repo.deleteBoard(id);
  }
}

module.exports = new BoardService(
  require('./boardRepository'),
  require('./boardMapper')
);
