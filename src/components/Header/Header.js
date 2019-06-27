import React from 'react';
import { connect } from 'react-redux';
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
    currentUser,
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
          currentUser ?
            <div className="app-bar__button-container">
              <button
                className="button button__flat"
                onClick={logOut}
              >
                Log Out
              </button>
            </div>
            :
            <div className="app-bar__button-container">
              <Link>
                <a href={asPath === '/login' ? '/signup' : '/login'}>
                  <button className="button button__flat">
                    {asPath === '/login' ? 'Sign Up' : 'Log In'}
                  </button>
                </a>
              </Link>
            </div>
        }
      </div>
      <LeftNav open={open} handleToggle={handleToggle} currentUser={currentUser} />
    </header>
  );
};

Header.propTypes = {
  handleToggle: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  // currentUser: PropTypes.object,
  asPath: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
};


function mapStateToProps({ currentUser }) {
  return { currentUser };
}

export default connect(mapStateToProps)(Header);
