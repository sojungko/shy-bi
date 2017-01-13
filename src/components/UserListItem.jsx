import React, { PropTypes } from 'react';
import renderUserList from '../modules/users';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '50%',
    overflowY: 'auto',
  },
};

const UserListItem = ({ users, handleClick }) => (
  <table>
    <tr>{renderUserList(users, handleClick)}</tr>
  </table>
);

UserListItem.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  handleClick: PropTypes.func,
};

export default UserListItem;
