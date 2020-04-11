const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const morgan = require('morgan');

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

// logging requests
app.use(
  morgan((tokens, req, res) => {
    return [
      `-- ${tokens.date(req, res, 'web')}`,
      `method: ${tokens.method(req, res)}`,
      `path: ${tokens.url(req, res)}`,
      `params: ${JSON.stringify(req.query)}`,
      `body: ${JSON.stringify(req.body)}`
    ].join(', ');
  })
);

app.use('/users', require('./components/users/userRouter'));
app.use('/boards', require('./components/boards/boardRouter'));
app.use('/boards/:boardId/tasks', require('./components/tasks/taskRouter'));

module.exports = app;
