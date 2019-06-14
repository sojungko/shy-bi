import React from 'react';
// import GridListTile from '@material-ui/core/GridListTile';
// import Paper from '@material-ui/core/Paper';
import { getUsername } from '../modules/auth';

const gridTileStyle = {
  opacity: '50%',
  fontFamily: 'Source Sans Pro',
  cursor: 'pointer',
  height: '300px',
  width: '200px',
  title: {
    fontSize: '24px',
  },
  subtitle: {
    fontSize: '16px',
  },
};

const paperStyle = {
  height: '300px',
  width: '200px',
};

const renderUserList = (users, handleClick) => users
  .filter(({ username }) => username !== getUsername())
  .map(({ name, sex, age, city, image_url, username, online }, index) => {
    const renderOnlineIcon = (bool) => {
      if (bool) {
        return <i className="fa fa-circle" style={{ color: '#81C784' }} aria-hidden="true" />;
      }
    };
    return (
      <div
        key={index}
        title={name}
        style={gridTileStyle}
        titleStyle={gridTileStyle.title}
        subtitle={<span style={gridTileStyle.subtitle}>{city}</span>}
        cols={2}
        actionIcon={renderOnlineIcon(online)}
        onClick={() => handleClick(username)}
      >
        <img role="presentation" src={image_url} />
      </div>
    );
  },
);

export default renderUserList;
