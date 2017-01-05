import React, { Component, PropTypes } from 'react';

import { isUserAuthenticated } from '../modules/auth';

console.log('CONTAINER/LIKES | Exporting LIKES...');

class Likes extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentWillMount() {
    console.log('    CONTAINER/LIKES | Preparing to render LIKES container');
    console.log('      CONTAINER/LIKES | Checking if User is Authenticated');

    if (!isUserAuthenticated()) {
      console.log('      CONTAINER/LIKES | User is not authenticated. Redirecting to LogIn');
      this.context.router.push('/login');
    } else {
      console.log('      CONTAINER/LIKES | User is authenticated. Populating page with user data');
      // this.props.getAllUsers();
    }
  }

  componentDidMount() {
    console.log('    CONTAINER/LIKES | Complete Rendering LIKES ');
  }

  componentWillReceiveProps(nextProps) {
    // console.log('    CONTAINER/LIKES | Receiving Props: ', this.props.users, nextProps.users);
    console.log('    CONTAINER/LIKES | Receiving Props');
  }

  componentDidUpdate() {
    console.log('    CONTAINER/LIKES | Complete Rendering LIKES');
  }

  render() {
    console.log('    CONTAINER/LIKES | Rendering LIKES...');
    return (
      <div>
        <h3>Liked User 1</h3>
        <h3>Liked User 2</h3>
        <h3>Liked User 3</h3>
        <h3>Liked User 4</h3>
        <h3>Liked User 5</h3>
      </div>
    );
  }
}

export default Likes;

console.log('CONTAINER/LIKES | Exported LIKES');
console.log(' ');
