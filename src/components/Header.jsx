import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';

const Header = (props) => {
  if (!props.auth) {
    if (props.location === '/login') {
      return (
        <AppBar
          title="ShyBi"
          onLeftIconButtonTouchTap={props.handleToggle}
          iconElementRight={
            <FlatButton
              label="Sign Up"
              containerElement={<Link to="/signup" />}
            />}
        />
      );
    } else {
      return (
        <AppBar
          title="ShyBi"
          onLeftIconButtonTouchTap={props.handleToggle}
          iconElementRight={
            <FlatButton
              label="Log In"
              containerElement={<Link to="/login" />}
            />}
        />
      );
    }
  }

  return (
    <AppBar
      title="ShyBi"
      onLeftIconButtonTouchTap={props.handleToggle}
      iconElementRight={
        <FlatButton
          onTouchTap={props.logOut}
          label="Log Out"
          containerElement={<Link to="/" />}
        />}
    />
  );
};

Header.propTypes = {
  handleToggle: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired,
  location: PropTypes.string.isRequired,
};

export default Header;
