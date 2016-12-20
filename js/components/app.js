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
        <Navbar />
        <SearchBar />
        <UserList
          onUserSelect={selectedUser => this.setState({selectedUser})}
          users={this.state.users} />
      </div>
    )
  }
}

export default App;
