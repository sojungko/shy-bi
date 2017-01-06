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
    const likedUsers = 
    return (
      <div>
       
      </div>
    );
  }
}

export default Likes;
