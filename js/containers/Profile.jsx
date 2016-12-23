import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../actions/index';
import { browserHistory } from 'react-router';

console.log('containers/Profile getUser : ', getUser)

class Profile extends Component {
  componentWillMount() {
    console.log('containers/Profile componentWillMount this.props.profile : ', this.props.profile);
    console.log('containers/Profile componentWillMount this.props.auth : ', this.props.auth);
    if (!this.props.auth) {
      browserHistory.push('/login')
    }
    getUser(this.props.auth.username);
  }

  renderProfile() {
    console.log('containers/Profile renderProfile this.props.profile : ', this.props.profile);
    console.log('containers/Profile renderProfile this.props.auth : ', this.props.auth);
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
    console.log('containers/Profile render this.props.profile : ', this.props.profile);
    console.log('containers/Profile render this.props.auth : ', this.props.auth);
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
