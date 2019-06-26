import React from 'react';
import PropTypes from 'prop-types';
import UserList from './UserList';

const RecommendedUserList = ({ recommended, handleClick }) => (
  <UserList users={recommended} handleClick={handleClick} />
);

RecommendedUserList.propTypes = {
  recommended: PropTypes.arrayOf(PropTypes.object),
  handleClick: PropTypes.func,
};

export default RecommendedUserList;
