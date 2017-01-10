import React, { PropTypes } from 'react';
import renderUserList from '../modules/users';

const RecommendedUserList = ({ recommended, handleClick }) => (
  <ul>
    {renderUserList(recommended, handleClick)}
  </ul>
);

RecommendedUserList.propTypes = {
  recommended: PropTypes.arrayOf(PropTypes.object),
  handleClick: PropTypes.func,
};

export default RecommendedUserList;
