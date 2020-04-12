class InternalError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

class DataError extends InternalError {
  constructor(message) {
    super(404, message);
  }
}

class RequestError extends Error {
  constructor(message) {
    super(400, message);
  }
}

module.exports = {
  DataError,
  RequestError,
  handleRoute: fn => async (req, res, next) => {
    try {
      return await fn(req, res, next);
    } catch (err) {
      return next(err);
    }
  },
  // eslint-disable-next-line no-unused-vars
  handleInnerError: (err, req, res, next) => {
    if (err instanceof InternalError) {
      res.status(err.status).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
