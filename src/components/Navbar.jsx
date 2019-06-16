import React from 'react';
import PropTypes from 'prop-types';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router' ;

const Navbar = (props) => {
  const renderMenu = () => props.menus
    .map(({ path, label }, index) =>
      <li
        key={index}
        label={label}
        containerElement={<Link to={path}>{label}</Link>}
      />);

  return (
    <ul className="tabs" contentContainerClassName="tab" >
      {renderMenu()}
    </ul>
  );
};

Navbar.propTypes = {
  menus: PropTypes.arrayOf(PropTypes.object.isRequired),
};

export default Navbar;
