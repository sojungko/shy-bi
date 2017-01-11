import React, { PropTypes } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Link } from 'react-router' ;

import styles from '../styles/Navbar';

const Navbar = (props) => {
  const renderMenu = () => props.menus
    .map(({ path, label }, index) =>
      <Tab
        key={index}
        label={label}
        containerElement={<Link to={path}>{label}</Link>}
        style={styles}
      />);

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
