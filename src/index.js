import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

// import routes from './routes/Routes';
import RootReducer from './reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger();
const store = createStore(
  RootReducer,
  composeEnhancers(
    applyMiddleware(thunk, logger),
  ),
);

ReactDOM.render(
  <Provider store={store}>
  </Provider>,
  document.getElementById('root'),
);
