import React, { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router';

const LeftNav = ({ auth, user, open, handleToggle }) => {
  if (!auth) {
    return (
      <Drawer open={open}>
        <Menu onItemTouchTap={handleToggle}>
          <MenuItem containerElement={<Link to="/" />}>Home</MenuItem>
          <Divider />
          <MenuItem containerElement={<Link to="/login" />}>Log In</MenuItem>
          <MenuItem containerElement={<Link to="/signup" />}>Sign Up</MenuItem>
          <MenuItem onTouchTap={handleToggle}>Close</MenuItem>
        </Menu>
      </Drawer>
    );
  }

  return (
    <Drawer open={open}>
      <Menu onItemTouchTap={handleToggle}>
        <MenuItem containerElement={<Link to={`/profile/${user}`} />}>Home</MenuItem>
        <Divider />
        <MenuItem containerElement={<Link to="/search" />}>Search</MenuItem>
        <MenuItem containerElement={<Link to={`/likes/${user}`} />}>Likes</MenuItem>
        <MenuItem containerElement={<Link to="messages" />}>Messages</MenuItem>
        <MenuItem containerElement={<Link to="/recommended" />}>Recommended</MenuItem>
        <MenuItem containerElement={<Link to="/myaccount" />}>My Account</MenuItem>
        <Divider />
        <MenuItem onTouchTap={handleToggle}>Close</MenuItem>
      </Menu>
    </Drawer>
  );
};

LeftNav.propTypes = {
  user: PropTypes.string,
  open: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired,
};

export default LeftNav;
