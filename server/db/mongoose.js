const mongoose = require('mongoose');
const config = require('../config.js');

const CONNECTION_TIMEOUT = 30000;

const options = {
  server: {
    socketOptions: {
      keepAlive: CONNECTION_TIMEOUT,
      connectTimeoutMS: CONNECTION_TIMEOUT
    }
  },
  replset: {
    socketOptions: {
      keepAlive: CONNECTION_TIMEOUT,
      connectTimeoutMS : CONNECTION_TIMEOUT
    }
  }
};

mongoose.Promise = global.Promise;

mongoose.set('debug', process.env.NODE_ENV !== 'production');

mongoose.connect(process.env.MONGODB_URI || config.db.url, options);

module.exports = mongoose;