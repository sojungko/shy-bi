import React from 'react';
import { getUsername } from '../modules/auth';

const renderUserList = (users, handleClick) => users
  .filter(({ username }) => username !== getUsername())
  .map(({ name, sex, age, city, image_url, username, online }, index) => (
    <li key={index} onClick={() => handleClick(username)}>
      <img role="presentation" src={image_url} />
      <h3>{name}</h3>{online && 'ONLINE'}
      <h5>Sex: {sex}</h5>
      <h5>Age: {age}</h5>
      <h5>City: {city}</h5>
    </li>
  ));

export default renderUserList;
