import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';

const isProd = process.env.NODE_ENV === 'production';

const makeStore = (initialState = { apiHeaders: {} }, { isServer, req = {} }) => {
  const composeEnhancers = typeof window !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

  const logger = createLogger();
  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(thunk, logger),
    ),
  );

  return store;
};

export default makeStore;

