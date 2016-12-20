import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import App from '../components/App';
import Navbar from '../components/Navbar';
import Login from '../components/Login';
import Signup from '../components/Signup';
import UserList from '../containers/UserList';
import Profile from '../containers/Profile';

const Greeting = () => {
  return <div>Hey there!</div>;
}


export default (
  <Route>
    <Route path='/' component={App}>
      <IndexRoute component={Login} />
      <Route component={Navbar} />
        <Route path='signup' component={Signup} />
        <Route path='search' component={UserList} />
        <Route path='profile' component={Profile} />
    </Route>
  </Route>
)
