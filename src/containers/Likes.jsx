import React, { Component, PropTypes } from 'react';

import { isUserAuthenticated } from '../modules/auth';

class Likes extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentWillMount() {
    if (!isUserAuthenticated()) {
      this.context.router.push('/login');
    }
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
