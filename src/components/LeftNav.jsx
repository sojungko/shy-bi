import React from 'react';
import PropTypes from 'prop-types';
// import Drawer from '@material-ui/core/Drawer';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router';

import { leftNavUnAuth, leftNavAuth } from '../modules/leftNavMenus';


const LeftNav = ({ auth, open, handleToggle }) => {
  const renderMenuItems = menu => menu
    .map(({ link, label }, index) =>
      <li key={index} className="left-navmenu-item" containerElement={<Link to={link}>{label}</Link>}>{label}</li>);

  const renderDrawer = menu => (
    <div open={open}>
      <ul onItemTouchTap={handleToggle}>
        <li containerElement={<Link to="/"> Home </Link>}>Home</li>
        {/* <Divider /> */}
        {renderMenuItems(menu)}
        {/* <Divider /> */}
        <li onTouchTap={handleToggle}>Close</li>
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
