const { PORT } = require('./common/config');
const app = require('./app');
const { handleUncaughtException, handleRejection } = require('./common/errors');

process.on('uncaughtException', handleUncaughtException);
process.on('unhandledRejection', handleRejection);

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
