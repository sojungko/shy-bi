import React, { Component } from 'react';

export default class Navbar extends Component {
  render() {
    return (
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/search">Search</a></li>
        <li><a href="/profile">My Profile</a></li>
      </ul>
    );
  }
}
