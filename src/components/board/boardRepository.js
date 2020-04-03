const Board = require('./boardModel');

const repository = () => {
  const boards = [
    new Board({ title: 'Development' }),
    new Board({ title: 'Sales' })
  ];

  const getAllBoards = async () => {
    return boards;
  };

  const getBoardById = async id => boards.find(board => board.id === id);

  const createBoard = async data => {
    if (data.title) {
      const board = new Board({ ...data });
      boards.push(board);
      return board;
    }
    return undefined;
  };

  const updateBoard = async board => {
    const idx = boards.findIndex(b => b.id === board.id);
    if (idx !== -1) {
      const b = boards[idx];
      b.title = board.title;
      b.columns = board.columns;
      return b;
    }
    return undefined;
  };

  const deleteBoard = async id => {
    const idx = boards.findIndex(board => board.id === id);
    if (idx !== -1) {
      boards.splice(idx, 1);
      return 204;
    }
    return 404;
  };

  return { getAllBoards, getBoardById, createBoard, updateBoard, deleteBoard };
};

module.exports = repository();
