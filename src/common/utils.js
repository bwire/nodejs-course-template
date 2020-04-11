module.exports = {
  handleRoute: fn => async (req, res, next) => {
    try {
      return await fn(req, res, next);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }
};
