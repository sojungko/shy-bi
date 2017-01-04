import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Link } from 'react-router';
import { isUserAuthenticated, deauthenticateUser } from '../modules/auth';

console.log('COMPONENT/NAV BAR | Exporting NAV BAR...');

class Navbar extends Component {
  handleLogout = () => {
    console.log('handleLogout being called');
    deauthenticateUser();
  }

  render() {
    if (isUserAuthenticated()) {
      return (
        <Tabs>
          <Tab label="Home" containerElement={<Link to="/" />} />
          <Tab label="Search" containerElement={<Link to="/search" />} />
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
    )
  }
}


export default Navbar;
console.log('    COMPONENT/NAV BAR | Rendering NAV BAR Component...');
console.log('COMPONENT/NAV BAR | Exported APP');
console.log(' ');
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  handleLoginClick = () => {
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick = () => {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let loginNav = null;
    if (isLoggedIn) {
      loginNav = <LoginNav onClick={this.handleLoginClick} />;
    } else {
      loginNav = <LogoutNav onClick={this.handleLogoutClick} />;
    }

    return (
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        {loginNav}
      </ul>
    );
  }
};

console.log('    COMPONENT/NAV BAR | Rendering NAV BAR Component...');
export default Navbar;
console.log('COMPONENT/NAV BAR | Exported APP');
console.log(' ');

const LoginNav = () => {
  return (
    <div>
      <li><Link to="/signup">Signup</Link></li>
      <li><Link to="/login">Login</Link></li>
    </div>
  );
};

const LogoutNav = () => {
  return (
    <li><Link to="/logout">Logout</Link></li>
  );
};
