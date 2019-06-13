import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
    <Tabs className="tabs" contentContainerClassName="tab" >
      {renderMenu()}
    </Tabs>
  );
};

Navbar.propTypes = {
  menus: PropTypes.arrayOf(PropTypes.object.isRequired),
};

export default Navbar;
