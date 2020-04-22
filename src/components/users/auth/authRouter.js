const router = require('express').Router();
const authService = require('./authService');
const userService = require('../userService');

const { handleRoute, ForbiddenError } = require('../../../common/errors');

router.route('/').post(
  handleRoute(async (req, res) => {
    const { login, password } = req.body;
    const jwtPayload = await userService.authenticateUser({ login, password });
    if (jwtPayload) {
      const jwt = await authService.createJwt(jwtPayload);
      res.statusMessage = 'Successful login';
      res.send(jwt);
    } else {
      throw new ForbiddenError('Incorrect login or password');
    }
  })
);

module.exports = router;
