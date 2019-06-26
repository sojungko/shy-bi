import React from 'react';
import SearchBar from 'components/SearchBar';
import UserListItem from 'components/UserListItem';

const UserList = ({ users }) => (
  <div>
    <SearchBar />
    <ul>
      {users.map(user => (
        <UserListItem user={user} />
      ))}
    </ul>
  </div>
);


export default UserList;
