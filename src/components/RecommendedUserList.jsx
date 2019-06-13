import React from 'react';
import PropTypes from 'prop-types';
import UserListItem from './UserListItem';

const RecommendedUserList = ({ recommended, handleClick }) => (
  <UserListItem users={recommended} handleClick={handleClick} />
);

RecommendedUserList.propTypes = {
  recommended: PropTypes.arrayOf(PropTypes.object),
  handleClick: PropTypes.func,
};

export default RecommendedUserList;
