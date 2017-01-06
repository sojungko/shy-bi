import React, { Component, PropTypes } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';

const Navbar = (props) => {
  const renderMenu = () => props.menus
    .map((menu, index) => <Tab key={index} label={menu} />);

  return (
    <Tabs>
      {renderMenu()}
    </Tabs>
  );
};

Navbar.propTypes = {
  menus: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default Navbar;
