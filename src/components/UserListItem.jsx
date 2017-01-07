import React, { PropTypes } from 'react';

const UserListItem = ({ user, handleClick }) => {
  const { name, sex, age, city, image_url, username } = user;

  const onClick = () => {
    handleClick(username);
  };

  return (
    <div onClick={onClick}>
      <img role="presentation" src={image_url} />
      <li>
        <h3>{name}</h3>
        <h5>Sex: {sex}</h5>
        <h5>Age: {age}</h5>
        <h5>City: {city}</h5>
      </li>
    </div>
  );
};

UserListItem.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    sex: PropTypes.string,
    age: PropTypes.string,
    city: PropTypes.string,
    username: PropTypes.string,
    image_url: PropTypes.string,
  }),
  handleClick: PropTypes.func.isRequired,
};

export default UserListItem;
