import React, { PropTypes } from 'react';
import renderUserList from '../modules/users';

const Likes = ({ likes, handleClick }) => (
  <ul>
    {renderUserList(likes, handleClick)}
  </ul>
);

Likes.propTypes = {
  likes: PropTypes.arrayOf(PropTypes.object),
  handleClick: PropTypes.func,
};


export default Likes;
