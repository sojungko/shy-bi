import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../actions/index';
import { browserHistory } from 'react-router';

console.log('containers/Profile getUser : ', getUser);

class Profile extends Component {
  componentWillMount() {
    if (!this.props.auth.isAuthenticated) {
      browserHistory.push('/login')
    }
    console.log('this.props.profile : ', this.props.profile)
  }

  renderProfile() {
    return (
      <ul>
        <li>Name: {this.props.profile.name}</li>
        <li>Sex: {this.props.profile.sex}</li>
        <li>Age: {this.props.profile.age}</li>
        <li>City: {this.props.profile.city}</li>
      </ul>
    )
  }
  render() {
    if (!this.props.profile) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div>
        {this.renderProfile()}
      </div>
    );
  }
}

function mapStateToProps({ profile, auth }) {
  return { profile, auth };
}

export default connect(mapStateToProps, { getUser })(Profile);
