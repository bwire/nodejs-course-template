const mongoose = require('mongoose');
const uuid = require('uuid');

const columnSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuid
  },
  title: String,
  order: Number
});

const boardScnhema = new mongoose.Schema({
  id: {
    type: String,
    default: uuid
  },
  title: String,
  columns: [columnSchema]
});

module.exports = mongoose.model('Board', boardScnhema);
