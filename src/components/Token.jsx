import React, { Component, PropTypes } from 'react';

export default class Token extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentWillMount() {
    const token = window.location.hash.slice(8);
    localStorage.setItem('token', token);
    this.context.router.push('/facebook/signup');
  }

  render() {
    return (
      <div>token</div>
    );
  }
}
