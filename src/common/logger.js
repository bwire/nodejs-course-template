const morgan = require('morgan');

module.exports = morgan((tokens, req, res) => {
  console.log('response', res);
  return [
    `-- ${tokens.date(req, res, 'web')}`,
    `method: ${tokens.method(req, res)}`,
    `path: ${tokens.url(req, res)}`,
    `status: ${tokens.status(req, res)}`,
    `message: ${res.statusMessage}`,
    `params: ${JSON.stringify(req.query)}`,
    `body: ${JSON.stringify(req.body)}`
  ].join(', ');
});
