import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import { userFromCookie } from 'modules/cookies';
import decorateUser from 'modules/user-decorator';

import rootReducer from './reducers';

const isProd = process.env.NODE_ENV === 'production';

const makeStore = (initialState = {}, { req = {} }) => {
  const composeEnhancers =
    typeof window !== 'undefined'
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;
  const { cookies } = req;
  const currentUser =
    (initialState.currentUser && decorateUser(initialState.currentUser)) ||
    (userFromCookie(cookies) && decorateUser(userFromCookie(cookies))) ||
    null;
  const visitedUser = initialState.visitedUser
    ? decorateUser(initialState.visitedUser)
    : null;

  const logger = createLogger();
  const store = createStore(
    rootReducer,
    { ...initialState, currentUser, visitedUser },
    composeEnhancers(applyMiddleware(thunk, logger))
  );

  return store;
};

export default makeStore;
