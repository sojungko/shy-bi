import React from 'react';
import { connect } from 'react-redux';
import {
  bool,
  func,
  string,
} from 'prop-types';
import Link from 'next/link';
import Menu from '@material-ui/icons/Menu';

import { userPropType } from 'constants/prop-types';
import LeftNav from './LeftNav';

const Header = (props) => {
  const {
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
        <Link href="/">
          <a className="app-bar__logo">
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
              <Link href={asPath === '/login' ? '/signup' : '/login'}>
                <a>
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
  asPath: string.isRequired,
  currentUser: userPropType,
  handleToggle: func.isRequired,
  logOut: func,
  open: bool.isRequired,
};


function mapStateToProps({ currentUser }) {
  return { currentUser };
}

export default connect(mapStateToProps)(Header);
