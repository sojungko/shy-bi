import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import { userFromCookie } from 'modules/cookies';

const isProd = process.env.NODE_ENV === 'production';

const makeStore = (initialState = {}, { isServer, req = {} }) => {
  const composeEnhancers = typeof window !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  const { cookies } = req;
  const currentUser = initialState.currentUser || userFromCookie(cookies) || null;

  const logger = createLogger();
  const store = createStore(
    rootReducer,
    { ...initialState, currentUser },
    composeEnhancers(
      applyMiddleware(thunk, logger),
    ),
  );

  return store;
};

export default makeStore;

