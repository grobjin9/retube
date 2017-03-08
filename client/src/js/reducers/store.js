import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';
import { redirect } from './customMiddlewares';

const { NODE_ENV } = process.env;

const middlewares = [thunk, redirect];

if (NODE_ENV === 'development' || NODE_ENV === undefined) {
  const createLogger = require('redux-logger');
  const logger = createLogger();

  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;