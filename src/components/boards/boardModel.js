const Column = require('../columns/columnModel');

module.exports = class {
  constructor({
    id = require('uuid')(),
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
};
