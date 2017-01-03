import React, { Component, PropTypes } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

console.log('COMPONENT/NAV BAR | Exporting NAV BAR...');

const Navbar = () => {
  return (
    <Tabs>
      <Tab label="Home" containerElement={<Link to="/" />} />
      <Tab label="Search" containerElement={<Link to="/search" />} />
      <Tab label="Recommended For You" containerElement={<Link to="/recommended" />} />
      <Tab label="Login" containerElement={<Link to="/login" />} />
      <Tab label="Signup" containerElement={<Link to="/signup" />} />
    </Tabs>
  );
}


export default Navbar;
console.log('    COMPONENT/NAV BAR | Rendering NAV BAR Component...');
console.log('COMPONENT/NAV BAR | Exported APP');
console.log(' ');
