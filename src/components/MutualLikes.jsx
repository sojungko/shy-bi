import React, { PropTypes } from 'react';
import renderUsers from '../modules/users';

const MutualLikes = ({ mutualLikes, handleClick }) => (
  <ul>
    {renderUsers(mutualLikes, handleClick)}
  </ul>
);

MutualLikes.propTypes = {
  mutualLikes: PropTypes.arrayOf(PropTypes.object),
  handleClick: PropTypes.func,
};

export default MutualLikes;
