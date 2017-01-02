import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../actions/index';
import { browserHistory } from 'react-router';

console.log('containers/Profile getUser : ', getUser);

class Profile extends Component {
  componentWillMount() {
    // if (!this.props.auth.success) {
    //   browserHistory.push('/login')
    // }
    console.log('this.props.auth.user : ', this.props.auth.user)
  }

  renderProfile() {
    if (!this.props.auth.user) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <ul>
        <li>Name: {this.props.auth.user.name}</li>
        <li>Sex: {this.props.auth.user.sex}</li>
        <li>Age: {this.props.auth.user.age}</li>
        <li>City: {this.props.auth.user.city}</li>
      </ul>
    )
  }
  render() {
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
