import React, { Component } from 'react'
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import UserList from '../containers/UserList';
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
        <UserList />
      </div>
    )
  }
}

export default App;
