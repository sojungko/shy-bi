import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

export default class Token extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const token = window.location.hash.slice(8);
    window.localStorage.setItem('token', token);
    Router.push('/facebook/signup');
  }

  render() {
    return (
      <div>token</div>
    );
  }
}
