import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import App from '../components/App';
import Navbar from '../components/Navbar';
import Login from '../components/Login';
import SignUp from '../components/signup';
import UserList from '../containers/UserList';
import Profile from '../containers/Profile';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={SignUp} />
    <Route component={Navbar} />
      <Route path='signup' component={SignUp} />
      <Route path='search' component={UserList} />
      <Route path='profile' component={Profile} />
  </Route>
)
