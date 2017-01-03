import React from 'react';
import { Link } from 'react-router';

console.log('COMPONENT/NAV BAR | Exporting NAV BAR... ');

const Navbar = () => {
  console.log('    COMPONENT/NAV BAR | Rendering NAV BAR Component...');
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/search">Search</Link></li>
      <li><Link to="/profile">Profile</Link></li>
      <li><Link to="/signup">Signup</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  );
};

export default Navbar;
console.log('COMPONENT/NAV BAR | Exported APP');
console.log(' ');
