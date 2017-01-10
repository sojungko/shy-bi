import React, { PropTypes } from 'react';
import { getUsername } from '../modules/auth';

const UserListItem = ({ users, handleClick }) => {
  const renderUserList = () => users
    .filter(({ username }) => username !== getUsername())
    .map(({ name, sex, age, city, image_url, username }, index) => (
      <li key={index} onClick={() => handleClick(username)}>
        <img role="presentation" src={image_url} />
        <h3>{name}</h3>
        <h5>Sex: {sex}</h5>
        <h5>Age: {age}</h5>
        <h5>City: {city}</h5>
      </li>
    ));

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
