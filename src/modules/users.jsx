import React from 'react';
import UserListItem from '../components/UserListItem';

export default function renderUsers(users) {
  return users.map((user, idx) =>
    <UserListItem key={idx} user={user} />,
  );
}
