import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Menu from '@material-ui/icons/Menu';
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

const Header = (props) => {
  const {
    handleTitleClick,
    handleClick,
    numberOfMatches,
    numberOfMessages,
    logOut,
    handleToggle,
    auth,
    location,
  } = props;

  /* const renderButton = (label, path) => {
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
  };*/

  const renderAppBar = (label, path) => (
    <div className="app-bar">
      <Menu className="app-bar__menu-svg" />
      <h1
        className="app-bar__header"
        onClick={handleTitleClick}
      >
        SHYBI
      </h1>
      {
        auth ?
          <button
            className="button button--flat app-bar__button"
          >
            Log Out
          </button>
          :
          <a href="/#/login">
            <button
              className="button button--flat app-bar__button"
            >
              Log In
            </button>
          </a>
      }
      {
        auth &&
        <NotificationBadge
          numberOfMatches={numberOfMatches}
          numberOfMessages={numberOfMessages}
          handleClick={handleClick}
        />
      }
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
