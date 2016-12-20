import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserListItem from '../components/UserListItem';

class UserList extends Component {
  renderList() {
    return this.props.users.map((user, index) => {
      return(
        <li key={index}>{user.user.name}</li>
      )
    });
  }

  render() {
    console.log('USERLIST THIS.PROPS:', this.props)
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(UserList);
