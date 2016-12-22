import React, { Component } from 'react';
import Navbar from './navbar.jsx';
// import SearchBar from '../containers/SearchBar';
// import UserList from '../containers/UserList.jsx';
// import UserListItem from '../containers/UserListItem.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      selectedUser: null,
    };
  }

  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}

export default App;
