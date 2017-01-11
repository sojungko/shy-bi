import React from 'react';
import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { getUsername } from '../modules/auth';

const renderUserList = (users, handleClick) => users
  .filter(({ username }) => username !== getUsername())
  .map(({ name, sex, age, city, image_url, username, online }, index) => (
    <GridTile
      key={index}
      title={name}
      subtitle={<span><b>{city}</b></span>}
      actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
      onClick={() => handleClick(username)}
    >
      <img role="presentation" src={image_url} />
    </GridTile>
  ));

export default renderUserList;
