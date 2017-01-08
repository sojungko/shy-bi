import React, { PropTypes } from 'react';
import UserListItem from '../components/UserListItem';

const Likes = (props) => {
  const renderList = () => props.likes.map((user, idx) => (
    <UserListItem key={idx} user={user} handleClick={props.handleClick} />
  ));

  return (
    <ul>
      {renderList()}
    </ul>
  );
};

export default Likes;
