const mongoose = require('mongoose');
const uuid = require('uuid');

const taskSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuid
  },
  title: String,
  order: Number,
  description: String,
  userId: String,
  boardId: String,
  columnId: String
});

module.exports = mongoose.model('BoaTaskrd', taskSchema);
