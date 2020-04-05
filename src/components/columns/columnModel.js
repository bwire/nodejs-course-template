module.exports = class {
  constructor({ id = require('uuid')(), title, order } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
};
