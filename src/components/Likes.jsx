import React, { PropTypes } from 'react';
import renderUsers from '../modules/users';

const Likes = ({ likes, handleClick }) => (
  <ul>
    {renderUsers(likes, handleClick)}
  </ul>
);

Likes.propTypes = {
  likes: PropTypes.arrayOf(PropTypes.object),
  handleClick: PropTypes.func,
};


export default Likes;
