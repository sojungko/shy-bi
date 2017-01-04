import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { isUserAuthenticated } from '../modules/auth';
import { getUser, getAllUsers } from '../actions/index';

console.log('CONTAINER/PROFILE | Exporting PROFILE...');

console.log('CONTAINER/PROFILE | IMPORTING Action: getUser, getAllUsers from ACTIONS');

class Profile extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      isAuthenticated: PropTypes.number.boolean,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        sex: PropTypes.string.isRequired,
        age: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
      }),
    }).isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentWillMount() {
    console.log(this.state);
    console.log('    CONTAINER/PROFILE | Preparing to render PROFILE container');
    console.log('      CONTAINER/PROFILE | Checking if User is Authenticated');

    if (!isUserAuthenticated()) {
      console.log('      CONTAINER/PROFILE | User is not authenticated. Redirecting to LogIn');
      this.context.router.push('/login');
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
    console.log('    CONTAINER/PROFILE | Rendering PROFILE Container...');
    return (
      <div>
        {this.renderProfile()}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  // console.log('    CONTAINER/PROFILE & REDUX | Mapping State to props: ', auth);
  console.log('    CONTAINER/PROFILE & REDUX | Mapping State to props: auth');
  return { auth };
}

// console.log('CONTAINER/PROFILE & REDUX | Mapping actions to props: ', getUser, getAllUsers);
console.log('CONTAINER/PROFILE & REDUX | Mapping actions to props: getUser, getAllUsers');
console.log('CONTAINER/PROFILE | Connecting PROFILE Container with REDUX STORE');
export default connect(mapStateToProps, { getUser, getAllUsers })(Profile);

console.log('CONTAINER/PROFILE | Exported PROFILE');
console.log(' ');
