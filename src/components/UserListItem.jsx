import React, { PropTypes } from 'react';
import renderUserList from '../modules/users';

const UserListItem = ({ users, handleClick }) => (
  <ul>
    {renderUserList(users, handleClick)}
  </ul>
);

UserListItem.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  handleClick: PropTypes.func,
};

export default UserListItem;
