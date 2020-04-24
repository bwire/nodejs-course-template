const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const { initLogger } = require('./common/logger');
const { handleInnerError } = require('./common/errors');
const { isAuthenticated } = require('./common/middleware');

const dbFn = require('./common/db');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

module.exports = launchFn => {
  const connectFn = dbFn(launchFn);
  app.use(express.json());
  app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
      res.send('Service is running!');
      return;
    }
    next();
  });

  // requests logging
  initLogger(app);

  app.use('/login', require('./components/auth/authRouter'));
  app.use('/users', isAuthenticated, require('./components/users/userRouter'));
  app.use(
    '/boards',
    isAuthenticated,
    require('./components/boards/boardRouter')
  );
  app.use(
    '/boards/:boardId/tasks',
    isAuthenticated,
    require('./components/tasks/taskRouter')
  );

  connectFn(app);
  app.use(handleInnerError);
};
