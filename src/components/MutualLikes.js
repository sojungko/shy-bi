import React from 'react';
import PropTypes from 'prop-types';
import UserListItem from './UserListItem';

const MutualLikes = ({ matches, handleClick }) => (
  <UserListItem users={matches} handleClick={handleClick} />
);

MutualLikes.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.object),
  handleClick: PropTypes.func,
};

export default MutualLikes;
