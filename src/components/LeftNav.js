import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import classNames from 'classnames';

import { leftNavUnAuth, leftNavAuth } from 'modules/left-nav-menus';

const LeftNav = ({ auth, open, handleToggle }) => {
  const renderMenuItems = menu => menu
    .map(({ href, label }, index) =>
      <li
        key={index}
        className="left-nav__item"
      >
        <button className="button button--flat button--link">
          <Link href={href}>
            {label}
          </Link>
        </button>
      </li>);

  const leftNavStyle = classNames({
    'left-nav': true,
    'left-nav__active': !!open,
  });
  const renderDrawer = menu => (
    <div className={leftNavStyle}>
      <ul className="left-nav__list">
        <li className="left-nav__item">
          <button className="button button--flat button--link">
            <Link href="/">
            Home
          </Link>
          </button>
        </li>
        {renderMenuItems(menu)}
        <li
          className="left-nav__item"
          onClick={handleToggle}
        >
          <button className="button button--flat button--link">
          Close
          </button>
        </li>
      </ul>
    </div>
  );

  if (!auth) {
    return renderDrawer(leftNavUnAuth);
  }
  return renderDrawer(leftNavAuth);
};

LeftNav.propTypes = {
  user: PropTypes.string,
  open: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired,
};

export default LeftNav;
