import React, { PropTypes } from 'react';
import { getUsername } from '../modules/auth';

const UserListItem = ({ users, handleClick }) => {
  const renderUserList = () => users
    .filter(user => user.username !== getUsername())
    .map((user, index) => (
      <li key={index} onClick={() => handleClick(user.username)}>
        <img role="presentation" src={user.image_url} />
        <h3>{user.name}</h3>
        <h5>Sex: {user.sex}</h5>
        <h5>Age: {user.age}</h5>
        <h5>City: {user.city}</h5>
      </li>),
    );

  return <ul>{renderUserList()}</ul>;
};

UserListItem.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string,
      sex: PropTypes.string,
      age: PropTypes.string,
      city: PropTypes.string,
      username: PropTypes.string,
      image_url: PropTypes.string,
    }),
  })),
  handleClick: PropTypes.func.isRequired,
};

export default UserListItem;
