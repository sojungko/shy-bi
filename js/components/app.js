import React, { Component } from 'react'
import Navbar from './Navbar';
import SearchBar from '../containers/SearchBar';
import UserList from '../containers/UserList';
import UserListItem from '../containers/UserListItem';

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
        <Navbar />
        {this.props.children}
      </div>
    )
  }
}

export default App;
