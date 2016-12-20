import React, { Component } from 'react'
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
        <UserList
          onUserSelect={selectedUser => this.setState({selectedUser})}
          users={this.state.users} />
      </div>
    )
  }
}

export default App;
