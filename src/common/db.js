const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./config');

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = (launchFn, app) => {
  const db = mongoose.connection;
  db.on('error', () => {
    throw new Error('Database connection error');
  });
  db.once('open', () => {
    console.log('Connection to the database established...');
    db.dropDatabase();
    launchFn(app);
  });
  return db;
};
