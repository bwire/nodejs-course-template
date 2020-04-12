const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const { NODE_ENV } = require('./config');

const logger = () => {
  const logFile = path.join(__dirname, 'log/systemlog.log');

  // since morgan doesn't have the possibility to log custom strings, I have to deal with the additional functions
  const logCustom = message => {
    const time = new Date().toUTCString();
    const logstr = `-- ${time}, ${message}`;
    console.log(logstr);

    // eslint-disable-next-line no-sync
    fs.writeFileSync(logFile, logstr, { flags: 'a' });
  };

  return {
    initLogger: app => {
      const morganFn = (tokens, req, res) => {
        return [
          `-- ${tokens.date(req, res, 'web')}`,
          `method: ${tokens.method(req, res)}`,
          `path: ${tokens.url(req, res)}`,
          `status: ${tokens.status(req, res)}`,
          `message: ${res.statusMessage}`,
          `params: ${JSON.stringify(req.query)}`,
          `body: ${JSON.stringify(req.body)}`
        ].join(', ');
      };
      if (NODE_ENV.toLowerCase() === 'development') {
        app.use(morgan(morganFn));
      }
      app.use(
        morgan(morganFn, {
          stream: fs.createWriteStream(logFile, { flags: 'a' })
        })
      );
    },

    logProcessException: (message, origin) =>
      logCustom(`error: System error, origin: ${origin}, message: ${message}`),

    logPromiseRejection: reason =>
      logCustom(`error: Promise rejection, reason: ${reason}`)
  };
};

module.exports = logger();
