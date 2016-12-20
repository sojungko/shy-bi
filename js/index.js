import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import routes from './routes/Routes';

import App from './components/App';


ReactDOM.render(
  <Router history={browserHistory} routes={routes}>    
  </Router>,
  document.getElementById('root')
);
