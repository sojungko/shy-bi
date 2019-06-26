import React from 'react';
import PropTypes from 'prop-types';
import UserList from './UserList';

const Likes = ({ likes, handleClick }) => (
  <UserList users={likes} handleClick={handleClick} />
);

Likes.propTypes = {
  likes: PropTypes.arrayOf(PropTypes.object),
  handleClick: PropTypes.func,
};


export default Likes;
