import React from 'react';
import { bool, func } from 'prop-types';
import Link from 'next/link';
import classNames from 'classnames';
import { userPropType } from 'constants/prop-types';

import { leftNavUnAuth, leftNavAuth } from 'modules/left-nav-menus';

const LeftNav = ({ currentUser, open, handleToggle }) => {
  const renderMenuItems = menu =>
    menu.map(({ href, label }, index) => (
      <li key={index} className="left-nav--item">
        <button className="button button__flat button__link">
          <Link href={href}>
            <a>{label}</a>
          </Link>
        </button>
      </li>
    ));

  const leftNavStyle = classNames({
    'left-nav': true,
    'left-nav__active': !!open,
  });

  return (
    <div className={leftNavStyle}>
      <ul className="left-nav--list">
        {renderMenuItems(currentUser ? leftNavAuth : leftNavUnAuth)}
        <li className="left-nav--item">
          <button
            className="button button__flat button__link"
            onClick={handleToggle}
          >
            Close
          </button>
        </li>
      </ul>
    </div>
  );
};

LeftNav.propTypes = {
  currentUser: userPropType,
  open: bool.isRequired,
  handleToggle: func.isRequired,
};

export default LeftNav;
