import React, { Component } from 'react';
import UserListItem from './UserListItem';

export default class UserList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('USERLIST THIS.PROPS : ', this.props);
    const user = this.props.users.map((user, index) => {
      return <UserListItem
        onUserSelect={this.props.onUserSelect}
        key={index}
        user={user} />
    });
    return (
      <ul className="list-group col-sm-4">
        User information goes here
        {user}
      </ul>
    )
  }
}
