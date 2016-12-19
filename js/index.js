import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/Routes';
import { browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';
import createLogger from 'redux-logger';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';

if (window === window.top) {
  window.React = React;
}

const reduxLoggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  sagaMiddleware,
  reduxLoggerMiddleware,
  routerMiddleware(browserHistory)
)(createStore);

const store = createStoreWithMiddleware(reducers);
const history = syncHistoryWithStore(browserHistory, store);
sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider>
    <Routes browserHistory={history}/>
  </Provider>,
  document.getElementById('root')
);
