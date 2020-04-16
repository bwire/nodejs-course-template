const mongoose = require('mongoose');
const uid = require('uuid');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uid
  },
  name: String,
  login: String,
  password: String
});

module.exports = mongoose.model('User', userSchema);
