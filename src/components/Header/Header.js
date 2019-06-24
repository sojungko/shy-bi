import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Menu from '@material-ui/icons/Menu';
// import NotificationBadge from '../Badges';
import LeftNav from './LeftNav';

const Header = (props) => {
  const {
    // handleTitleClick,
    // handleClick,
    // numberOfMatches,
    // numberOfMessages,
    logOut,
    handleToggle,
    auth,
    asPath,
    open,
  } = props;

  return (
    <header className="header">
      <div className="app-bar">
        <Menu
          className="app-bar__menu-svg"
          onClick={handleToggle}
        />
        <Link>
          <a href="/" className="app-bar__logo">
            <h1 className="app-bar__header">
              shybi
            </h1>
          </a>
        </Link>
        {
          auth ?
            <button
              className="button button--flat"
              onClick={logOut}
            >
              Log Out
            </button>
            :
            <Link>
              <a href={asPath === '/login' ? '/signup' : '/login'} className="app-bar__button-container">
                <button className="button button--flat">
                  {asPath === '/login' ? 'Sign Up' : 'Log In'}
                </button>
              </a>
            </Link>
        }
        {/* {
          auth &&
          <NotificationBadge
            numberOfMatches={numberOfMatches}
            numberOfMessages={numberOfMessages}
            handleClick={handleClick}
          />
        } */}
      </div>
      <LeftNav open={open} handleToggle={handleToggle} auth={auth} />
    </header>
  );
};

Header.propTypes = {
  handleToggle: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired,
  asPath: PropTypes.string.isRequired,
};

export default Header;
