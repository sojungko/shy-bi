import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
// import AppBar from '@material-ui/core/AppBar';
// import Button from '@material-ui/core/Button';
import { Link } from 'react-router';
import NotificationBadge from './Badges';

const styles = {
  appBar: {
    backgroundColor: 'white',
    cursor: 'pointer',
    position: 'fixed',
    height: '70px',
  },
  title: {
    color: 'black',
    opacity: 1,
    fontFamily: 'Source Sans Pro',
    fontSize: '50px',
    marginLeft: '30px',
  },
  button: {
    color: 'grey',
  },
  buttonLabel: {
    fontSize: '17px',
  },
};

const Header = ({ handleTitleClick, handleClick, numberOfMatches, numberOfMessages, logOut, handleToggle, auth, location }) => {
  const renderButton = (label, path) => {
    const flatButton = (
      <button
        label={label}
        containerElement={<Link to={path}>{label}</Link>}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      />
   );
    if (label === 'Log Out') return cloneElement(flatButton, { onTouchTap: logOut });
    return flatButton;
  };

  const renderAppBar = (label, path) => (
    <div id="AppBar" className="app-bar-container">
      <div
        title="SHYBI"
        style={styles.appBar}
        titleStyle={styles.title}
        onLeftIconButtonTouchTap={handleToggle}
        onTitleTouchTap={handleTitleClick}
        iconClassNameLeft="app-bar-left-icon"
        iconElementRight={renderButton(label, path)}
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
      </div>
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
