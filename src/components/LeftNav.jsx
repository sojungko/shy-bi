import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router';

import { leftNavUnAuth, leftNavAuth } from '../modules/leftNavMenus';


const LeftNav = ({ auth, open, handleToggle }) => {
  const renderMenuItems = menu => menu
    .map(({ link, label }, index) =>
      <MenuItem key={index} className="left-navmenu-item" containerElement={<Link to={link}>{label}</Link>}>{label}</MenuItem>);

  const renderDrawer = menu => (
    <Drawer open={open}>
      <Menu onItemTouchTap={handleToggle}>
        <MenuItem containerElement={<Link to="/"> Home </Link>}>Home</MenuItem>
        <Divider />
        {renderMenuItems(menu)}
        <Divider />
        <MenuItem onTouchTap={handleToggle}>Close</MenuItem>
      </Menu>
    </Drawer>
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
