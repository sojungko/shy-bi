import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import Navbar from './navbar';
import UserList from '../containers/user-list';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    const {auth, profile, userList} = this.props;
    return (
      <div>
        <Navbar />
        <UserList />
      </div>
    )
  }
}

export default App;
