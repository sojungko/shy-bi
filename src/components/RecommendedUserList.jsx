import React, { PropTypes } from 'react';
import UserListItem from './UserListItem';

const RecommendedUserList = ({ recommended, handleClick }) => (
  <UserListItem users={recommended} handleClick={handleClick} />
);

RecommendedUserList.propTypes = {
  recommended: PropTypes.arrayOf(PropTypes.object),
  handleClick: PropTypes.func,
};

export default RecommendedUserList;
