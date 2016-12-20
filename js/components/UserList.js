import React, { Component } from 'react';
import UserListItem from './UserListItem';

export default class UserList extends Component {
  render() {
    const user = this.props.users.map((user) => {
      return <UserListItem
        onUserSelect={this.props.onUserSelect}
        key={user.name}
        user={user} />
    });
    return (
      <ul className="list-group col-sm-4">
        {user}
      </ul>
    )
  }
}
