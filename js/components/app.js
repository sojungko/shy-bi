import React, { Component } from 'react'
import UserList from '../containers/UserList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      selectedUser: null
    };
  }

  render() {
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
