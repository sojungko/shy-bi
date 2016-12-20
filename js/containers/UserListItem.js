import React, { Component } from 'react';
// import { connect } from 'react-redux';

const UserListItem = ({user, onUserSelect}) => {
  const imageUrl = '';
  return (
    <li onClick={() => onUserSelect(user)} className="list-group-item">
      <img className="user-object" src={imageUrl} />
      <div className="details">
        <div>{user.name}</div>
        <div>{user.sex}</div>
        <div>{user.age}</div>
        <div>{user.city}</div>
      </div>
    </li>
  )
}

export default UserListItem;
