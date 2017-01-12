import React from 'react';
import { GridTile } from 'material-ui/GridList';
import { getUsername } from '../modules/auth';

const renderUserList = (users, handleClick) => users
  .filter(({ username }) => username !== getUsername())
  .map(({ name, sex, age, city, image_url, username, online }, index) => {
    const renderOnlineIcon = bool => bool && <i className="fa fa-circle" style={{ color: '#81C784' }} aria-hidden="true" />;
    return (
      <GridTile
        key={index}
        title={name}
        style={{ opacity: '50%', fontFamily: 'PT Sans', cursor: 'pointer' }}
        titleStyle={{ fontFamily: 'PT Sans', fontSize: '200%' }}
        subtitle={<span style={{ fontSize: '17px' }}>{city}</span>}
        cols={2}
        actionIcon={renderOnlineIcon(online)}
        onClick={() => handleClick(username)}
      >
        <img role="presentation" src={image_url} />
      </GridTile>
    );
  },
);

export default renderUserList;
