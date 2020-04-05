module.exports = class Task {
  constructor({
    id = require('uuid')(),
    title,
    order = 0,
    description,
    userId,
    boardId,
    columnId
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
};
