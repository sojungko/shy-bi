import React, { Component } from 'react';
import UserListItem from './UserListItem';

const UserList = (props) => {
  const userItems = props.users.map((user) => {
    return <UserListItem
      onUserSelect={props.onUserSelect}
      key={user.name}
      user={user} />
  });

  return (
    <ul className="list-group col-sm-4">
      {userItems}
    </ul>
  )
}

export default UserList;
