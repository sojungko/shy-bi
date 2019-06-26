import React from 'react';
import PropTypes from 'prop-types';
import UserList from './UserList';

const MutualLikes = ({ matches, handleClick }) => (
  <UserList users={matches} handleClick={handleClick} />
);

MutualLikes.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.object),
  handleClick: PropTypes.func,
};

export default MutualLikes;
