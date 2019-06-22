import React from 'react';
import PropTypes from 'prop-types';
import UserListItem from './UserListItem';

const Likes = ({ likes, handleClick }) => (
  <UserListItem users={likes} handleClick={handleClick} />
);

Likes.propTypes = {
  likes: PropTypes.arrayOf(PropTypes.object),
  handleClick: PropTypes.func,
};


export default Likes;
