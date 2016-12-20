import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import App from '../components/App';
import Navbar from '../components/navbar';
import Login from '../components/Login';
import Signup from '../components/Signup';
import UserList from '../containers/UserList';

const Greeting = () => {
  return <div>Hey there!</div>;
}


export default (
  <Route>
    <Route path='/' component={App}>
      <IndexRoute component={Login} />
      <Route component={Navbar}>
        <Route path='/signup' component={Signup} />
      </Route>
    </Route>
  </Route>
)
