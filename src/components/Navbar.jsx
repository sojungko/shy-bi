import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Link } from 'react-router';
import { getUsername, isUserAuthenticated, deauthenticateUser } from '../modules/auth';

console.log('COMPONENT/NAV BAR | Exporting NAV BAR...');

class Navbar extends Component {
  handleLogout = () => {
    console.log('COMPONENT/NAV BAR | Logging Out User...');
    deauthenticateUser();
  }

  render() {
    const username = getUsername();
    if (isUserAuthenticated()) {
      return (
        <Tabs>
          <Tab label="Home" containerElement={<Link to="/" />} />
          <Tab label="Search" containerElement={<Link to="/search" />} />
          <Tab label="Likes" containerElement={<Link to={`/likes/${username}`} />} />
          <Tab label="Recommended For You" containerElement={<Link to="/recommended" />} />
          <Tab label="Logout" containerElement={<Link to="/" />} onClick={this.handleLogout} />
        </Tabs>
      );
    }
    return (
      <Tabs>
        <Tab label="Home" containerElement={<Link to="/" />} />
        <Tab label="Login" containerElement={<Link to="/login" />} />
        <Tab label="Signup" containerElement={<Link to="/signup" />} />
      </Tabs>
    );
  }
}


export default Navbar;
console.log('    COMPONENT/NAV BAR | Rendering NAV BAR Component...');
console.log('COMPONENT/NAV BAR | Exported APP');
console.log(' ');
