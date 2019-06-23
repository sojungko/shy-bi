import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Menu from '@material-ui/icons/Menu';
import NotificationBadge from './Badges';

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

  const renderAppBar = (label, path) => (
    <div className="app-bar">
      <Menu
        className="app-bar__menu-svg"
        onClick={handleToggle}
      />
      <h1
        className="app-bar__header"
        onClick={handleTitleClick}
      >
        shybi
      </h1>
      {
        auth ?
          <Link>
            <a href="/logout">
              <button
                className="button button--flat"
                onClick={logOut}
              >
                Log Out
              </button>
            </a>
          </Link>
          :
          location === '/login' ?
            <Link>
              <a href="/signup" className="app-bar__button-container">
                <button
                  className="button button--flat"
                >
                  Sign Up
              </button>
              </a>
            </Link>
            :
            <Link>
              <a href="/login" className="app-bar__button-container">
                <button
                  className="button button--flat"
                >
                Log In
              </button>
              </a>
            </Link>
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
