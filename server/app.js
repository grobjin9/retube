const http = require('http');
const config = require('./config');
const express = require('express');
const port = normalizePort(process.env.PORT || '3000');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('./utils/logger');
const morgan = require('morgan');
const debug = require('debug')('mailapp:server');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const compression = require('compression');
const MongoStore = require('connect-mongo')(session);
const { checkAuth } = require('./utils/middlewares');
require('./utils/passport-init')(passport);


// Routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const api = require('./routes/api');

const app = express();
const server = http.createServer(app);

const sessionMiddleware = session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false
});

const io = require('./utils/socket')(server)(sessionMiddleware);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('combined', { "stream": logger.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

app.use(compression({ threshold: 0 }));

// static content
app.use(express.static(path.join(__dirname, '../', 'client', 'public')));
app.use(express.static(path.join(__dirname, '../', 'node_modules', 'bootstrap', 'dist')));

// dynamic content
app.use('/auth', auth);
app.use('/api', checkAuth, api);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => {
  // process.send('ready');
});
server.on('error', onError);
server.on('listening', onListening);

process.on('SIGINT', () => {
  mongoose.disconnect((err) => {
    process.exit(err ? 1 : 0);
  });
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
