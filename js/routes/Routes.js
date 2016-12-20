import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from '../components/App';
import Login from '../components/Login';
import UserList from '../containers/UserList';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={UserList} />
  </Route>
)
