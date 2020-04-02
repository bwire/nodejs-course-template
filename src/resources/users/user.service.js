const repo = require('./user.memory.repository');

const getAllUsers = async () => repo.getAllUsers();
const getUserById = async id => repo.getUserById(id);
const createUser = async (name, login, password) =>
  repo.createUser(name, login, password);
const updateUser = (id, name, login, password) =>
  repo.updateUser(id, name, login, password);
const deleteUser = id => repo.deleteUser(id);

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
