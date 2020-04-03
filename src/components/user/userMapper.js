module.exports = class {
  static toResponse(user) {
    if (user) {
      const { id, name, login } = user;
      return { id, name, login };
    }
    return user;
  }
};
