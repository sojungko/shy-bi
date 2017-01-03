import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, getAllUsers } from '../actions/index';
import { hashHistory } from 'react-router';

console.log('containers/Profile getUser : ', getUser);

class Profile extends Component {
  componentWillMount() {
    if (!this.props.auth.isAuthenticated) {
      hashHistory.push('/login');
    }
  }

  renderProfile() {
    if (!this.props.auth.user) {
      return (
        <div>Loading...</div>
      );
    }
    return (
      <ul>
        <li>Name: {this.props.auth.user.name}</li>
        <li>Sex: {this.props.auth.user.sex}</li>
        <li>Age: {this.props.auth.user.age}</li>
        <li>City: {this.props.auth.user.city}</li>
      </ul>
    );
  }
  render() {
    return (
      <div>
        {this.renderProfile()}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { getUser, getAllUsers })(Profile);
