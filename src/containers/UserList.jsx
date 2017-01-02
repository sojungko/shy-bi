import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUsers } from '../actions/index';
import SearchBar from './SearchBar';
// import UserListItem from '../containers/UserListItem.jsx';

class UserList extends Component {
  componentWillMount() {
    this.props.getAllUsers();
  }

  renderList() {
    return this.props.users.map((user, index) => {
      return (
        <li key={index}>{user.name}</li>
      );
    });
  }

  render() {
    return (
      <div>
        <SearchBar />
        <ul className="list-group col-sm-4">
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return { users };
}

export default connect(mapStateToProps, { getAllUsers })(UserList);
