const { PORT } = require('./common/config');
const initApp = require('./app');
const { handleUncaughtException, handleRejection } = require('./common/errors');

process.on('uncaughtException', handleUncaughtException);
process.on('unhandledRejection', handleRejection);

initApp(app => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
