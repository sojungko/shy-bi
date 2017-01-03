import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, hashHistory } from 'react-router';
import ReduxThunk from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import routes from './routes/Routes';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
injectTapEventPlugin();

console.log('INDEX.JSX | Importing REDUCERS');
console.log('INDEX.JSX | Importing ROUTES');

console.log('INDEX.JSX | Creating Redux Store and Applying Middlewears: Redux Thunk');
console.log(' ');
const createStoreWithMiddleware = composeEnhancers(applyMiddleware(ReduxThunk))(createStore);

console.log('INDEX.JSX | Preparing to Render APP Component via React Router');
ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={createStoreWithMiddleware(reducers)}>
      <Router history={hashHistory} routes={routes} />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
