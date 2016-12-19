import React, { Component } from 'react'

import Navbar from './Navbar';
import SearchBar from '../containers/SearchBar';
import UserList from '../containers/UserList';
import UserDetail from '../containers/UserDetail';

class App extends Component {


  render() {
    return (
      <div>
        <Navbar />
        <SearchBar />
        <UserList />
        <UserDetail />
      </div>
    )
  }
}

export default App;
