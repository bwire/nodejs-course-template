const uuid = require('uuid');
const Column = require('../column/columnModel');

class Board {
  constructor({
    id = uuid(),
    title,
    columns = [
      new Column({ title: 'Doing', order: 1 }),
      new Column({ title: 'Done', order: 2 })
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    return { ...board };
  }
}

module.exports = Board;
