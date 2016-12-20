import React, { Component } from 'react'
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import UserList from '../components/UserList';
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
    console.log('USERS: ', this.state.users);
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default App;
