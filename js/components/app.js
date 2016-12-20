import React, { Component } from 'react'
import Navbar from './Navbar';
import SearchBar from '../containers/SearchBar';
import UserList from '../containers/UserList';
import UserListItem from '../containers/UserListItem';
const sampleData = require('../sampleData.js');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: sampleData,
      selectedUser: null
    };
  }


  render() {
    return (
      <div>
        <SearchBar />
        <UserList />
        <UserListItem />
      </div>
    )
  }
}

export default App;
