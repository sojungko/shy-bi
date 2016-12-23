import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import App from '../components/app.jsx';
import Navbar from '../components/navbar.jsx';
import LogIn from '../components/login.jsx';
import SignUp from '../components/signup.jsx';
import UserList from '../containers/UserList.jsx';
import Profile from '../containers/Profile.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LogIn} />
    <Route component={Navbar} />
    <Route path="signup" component={SignUp} />
    <Route path="search" component={UserList} />
    <Route path="profile" component={Profile} />
    <Route path="login" component={LogIn} />
  </Route>
);
