const User = require('./user.model');

const repository = () => {
  const users = [
    new User({ name: 'User1', login: 'User1', password: 'password1' }),
    new User({ name: 'User2', login: 'User2', password: 'password2' }),
    new User({ name: 'User3', login: 'User3', password: 'password3' })
  ];

  const getAllUsers = async () => {
    return users;
  };

  const getUserById = async id => users.find(user => user.id === id);

  const createUser = async (name, login, password) => {
    if (name) {
      const user = new User({ name, login, password });
      users.push(user);
      return user;
    }
    return undefined;
  };

  const updateUser = async (id, name, login, password) => {
    const idx = users.findIndex(user => user.id === id);
    if (idx !== -1) {
      const user = users[idx];
      user.name = name;
      user.login = login;
      user.password = password;
      return user;
    }
    return undefined;
  };

  const deleteUser = async id => {
    const idx = users.findIndex(user => user.id === id);
    if (idx !== -1) {
      users.splice(idx, 1);
      return 204;
    }
    return 404;
  };

  return {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
  };
};

module.exports = repository();
