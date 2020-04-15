const mongoose = require('mongoose');
const uid = require('uuid');

const userSchema = new mongoose.Schema({
  name: String,
  login: String,
  password: String,
  _id: {
    type: String,
    default: uid
  }
});

module.exports = mongoose.model('User', userSchema);
