import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { isUserAuthenticated } from '../modules/auth';
import { getUser, getAllUsers } from '../actions/index';

console.log('CONTAINER/PROFILE | Exporting PROFILE...');

console.log('CONTAINER/PROFILE | IMPORTING Action: getUser, getAllUsers from ACTIONS');

class Profile extends Component {
  static propTypes = {
    getUser: PropTypes.func.isRequired,
    params: PropTypes.shape({
      username: PropTypes.string,
    }),
    profile: PropTypes.shape({
      name: PropTypes.string,
      age: PropTypes.string,
      sex: PropTypes.string,
      city: PropTypes.string,
    }),
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentWillMount() {
    console.log('    CONTAINER/PROFILE | Preparing to render PROFILE container');
    console.log('      CONTAINER/PROFILE | Checking if User is Authenticated');

    if (!isUserAuthenticated()) {
      console.log('      CONTAINER/PROFILE | User is not authenticated. Redirecting to LogIn');
      this.context.router.push('/login');
    } else if (!this.props.params.username) {
      console.log(`     CONTAINER/PROFILE | User is Authenticated. Fetching User data: ${localStorage.getItem('username')}`);
      this.props.getUser(localStorage.getItem('username'));
    } else {
      const username = this.props.params.username;
      console.log(`      CONTAINER/PROFILE | User is authenticated. Fetching User data: ${username}`);
      this.props.getUser(username);
    }
  }

  componentDidMount() {
    console.log('    CONTAINER/PROFILE | Complete Rendering PROFILE ');
  }

  componentWillReceiveProps(nextProps) {
    // console.log('    CONTAINER/PROFILE | Receiving Props: ', nextProps);
    console.log('    CONTAINER/PROFILE | Receiving Props');
  }

  componentWillUpdate() {
    console.log('    CONTAINER/PROFILE | PROFILE Component Will Update ');
    console.log('      CONTAINER/PROFILE | Checking if User is Authenticated');

    if (!isUserAuthenticated()) {
      console.log('      CONTAINER/PROFILE | User is not authenticated. Redirecting to LogIn');
      this.context.router.push('/login');
    }
  }

  componentDidUpdate() {
    console.log('    CONTAINER/PROFILE | Complete Rendering PROFILE ');
  }

  renderProfile() {
    console.log('    CONTAINER/PROFILE | Generating User Profile Detail List ', this.props.profile);
    const { name, sex, age, city } = this.props.profile;
    return (
      <ul>
        <li>Name: {name}</li>
        <li>Sex: {sex}</li>
        <li>Age: {age}</li>
        <li>City: {city}</li>
      </ul>
    );
  }

  render() {
    console.log('    CONTAINER/PROFILE | Rendering PROFILE Container...');
    return (
      <div>
        {this.renderProfile()}
      </div>
    );
  }
}

function mapStateToProps({ profile }) {
  // console.log('    CONTAINER/PROFILE & REDUX | Mapping State to props: ', profile);
  console.log('    CONTAINER/PROFILE & REDUX | Mapping State to props: profile');
  return { profile };
}

// console.log('CONTAINER/PROFILE & REDUX | Mapping actions to props: ', getUser, getAllUsers);
console.log('CONTAINER/PROFILE & REDUX | Mapping actions to props: getUser, getAllUsers');
console.log('CONTAINER/PROFILE | Connecting PROFILE Container with REDUX STORE');
export default connect(mapStateToProps, { getUser, getAllUsers })(Profile);

console.log('CONTAINER/PROFILE | Exported PROFILE');
console.log(' ');
