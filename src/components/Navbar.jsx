import React, { PropTypes } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Link } from 'react-router' ;

const Navbar = (props) => {
  const renderMenu = () => props.menus
    .map((menu, index) => <Tab key={index} label={menu.label} containerElement={<Link to={menu.path} />} />);

  return (
    <Tabs>
      {renderMenu()}
    </Tabs>
  );
};

Navbar.propTypes = {
  menus: PropTypes.arrayOf(PropTypes.object.isRequired),
};

export default Navbar;
