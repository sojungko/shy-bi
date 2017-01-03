import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, hashHistory } from 'react-router';
import ReduxThunk from 'redux-thunk';

import routes from './routes/Routes.jsx';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

console.log('INDEX.JSX | Importing REDUCERS');
console.log('INDEX.JSX | Importing ROUTES');

console.log('INDEX.JSX | Creating Redux Store and Applying Middlewears: Redux-Promise');

const createStoreWithMiddleware = composeEnhancers(applyMiddleware(ReduxThunk))(createStore);

console.log('INDEX.JSX | Preparing to Render APP Component via React Router');
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={hashHistory} routes={routes}>
    </Router>
  </Provider>,
  document.getElementById('root')
);
