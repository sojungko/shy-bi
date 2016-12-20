import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="search">Search</Link>
      </div>
    );
  }
}
