import React, { PropTypes, cloneElement } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import NotificationBadge from './Badges';

const containerStyle = {
  height: '70px',
};

const appBarStyle = {
  backgroundColor: '#ff294c',
  padding: '30px',
  cursor: 'pointer',
  position: 'fixed',
};

const Header = ({ handleTitleClick, handleClick, numberOfMatches, numberOfMessages, logOut, handleToggle, auth, location }) => {
  const renderFlatButton = (label, path) => {
    const flatButton = (
      <FlatButton
        label={label}
        labelStyle={{ fontFamily: 'Maria', color: 'white', fontSize: '15px' }}
        containerElement={<Link to={path}>{label}</Link>}
      />
   );
    if (label === 'Log Out') return cloneElement(flatButton, { onTouchTap: logOut });
    return flatButton;
  };

  const renderAppBar = (label, path) => (
    <div id="AppBar" style={containerStyle}>
      <AppBar
        title="BIND"
        style={appBarStyle}
        onLeftIconButtonTouchTap={handleToggle}
        onTitleTouchTap={handleTitleClick}
        iconElementRight={renderFlatButton(label, path)}
        titleStyle={{ fontFamily: 'Eskell', fontWeight: 900, color: '#04284a', fontSize: '72px' }}
        iconStyleLeft={{ backgroundColor: '#04284a' }}
        zDepth={0}
      >
        {
          auth &&
            <NotificationBadge
              numberOfMatches={numberOfMatches}
              numberOfMessages={numberOfMessages}
              handleClick={handleClick}
            />
        }
      </AppBar>
    </div>
  );

  if (!auth) {
    if (location === '/login') return renderAppBar('Sign UP', '/signup');
    return renderAppBar('Log In', '/login');
  }
  return renderAppBar('Log Out');
};

Header.propTypes = {
  handleToggle: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired,
  location: PropTypes.string.isRequired,
};

export default Header;
