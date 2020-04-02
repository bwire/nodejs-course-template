const router = require('express').Router();
const User = require('./user.model');
const service = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await service.getAllUsers();
  res.json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;
  const user = await service.createUser(name, login, password);
  if (user !== undefined) {
    res.statusMessage = 'The user has been created';
    res.json(User.toResponse(user));
  } else {
    res.statusCode = 400;
    res.send({ error: 'Bad request' });
  }
});

router.route('/:id').get(async (req, res) => {
  const user = await service.getUserById(req.params.id);
  if (user !== undefined) {
    res.json(User.toResponse(user));
  } else {
    res.statusCode = 404;
    res.send({ error: 'User not found' });
  }
});

router.route('/:id').put(async (req, res) => {
  const user = await service.updateUser(
    req.params.id,
    req.body.name,
    req.body.login,
    req.body.password
  );
  if (user !== undefined) {
    res.json(User.toResponse(user));
  } else {
    res.statusCode = 400;
    res.send({ error: 'Bad request' });
  }
});

router.route('/:id').delete(async (req, res) => {
  res.statusCode = await service.deleteUser(req.params.id);
  if (res.statusCode === 204) {
    res.json({ status: 'The user has been deleted' });
  } else {
    res.send({ error: 'User not found' });
  }
});

module.exports = router;
