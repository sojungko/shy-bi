import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Link } from 'react-router';
import { getUsername, isUserAuthenticated, deauthenticateUser } from '../modules/auth';

class Navbar extends Component {
  handleLogout = () => {
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
          <Tab label="Messages" containerElement={<Link to={'messages'} />} />
          <Tab label="Recommended For You" containerElement={<Link to="/recommended" />} />
          <Tab label="My Account" containerElement={<Link to="/myaccount" />} />
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
