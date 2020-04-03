const repo = require('./boardRepository');

const getAllBoards = async () => repo.getAllBoards();
const getBoardById = async id => repo.getBoardById(id);
const createBoard = async data => repo.createBoard(data);
const updateBoard = async board => repo.updateBoard(board);
const deleteBoard = async id => repo.deleteBoard(id);

module.exports = {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
