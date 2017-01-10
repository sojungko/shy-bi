import React, { PropTypes } from 'react';
import renderUserList from '../modules/users';

const MutualLikes = ({ matches, handleClick }) => (
  <ul>
    {renderUserList(matches, handleClick)}
  </ul>
);

MutualLikes.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.object),
  handleClick: PropTypes.func,
};

export default MutualLikes;
