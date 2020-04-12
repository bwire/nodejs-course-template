const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const { initLogger } = require('./common/logger');
const { handleInnerError } = require('./common/errors');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

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

app.use('/users', require('./components/users/userRouter'));
app.use('/boards', require('./components/boards/boardRouter'));
app.use('/boards/:boardId/tasks', require('./components/tasks/taskRouter'));

app.use(handleInnerError);

module.exports = app;
