import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Navbar extends Component {
  render() {
    return (
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    );
  }
}
