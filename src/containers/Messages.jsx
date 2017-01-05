import React, { Component, PropTypes } from 'react';
import { isUserAuthenticated } from '../modules/auth';

console.log('CONTAINER/MESSSAGES | Exporting MESSSAGES...');

class Messages extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentWillMount() {
    console.log('    CONTAINER/MESSSAGES | Preparing to render MESSSAGES container');
    console.log('      CONTAINER/MESSSAGES | Checking if User is Authenticated');

    if (!isUserAuthenticated()) {
      console.log('      CONTAINER/MESSSAGES | User is not authenticated. Redirecting to LogIn');
      this.context.router.push('/login');
    } else {
      console.log('      CONTAINER/MESSSAGES | User is authenticated. Populating page with Messages data');
    }
  }

  componentDidMount() {
    console.log('    CONTAINER/MESSSAGES | Complete Rendering MESSSAGES ');
  }

  componentWillReceiveProps(nextProps) {
    // console.log('    CONTAINER/MESSSAGES | Receiving Props: ', nextProps);
    console.log('    CONTAINER/MESSSAGES | Receiving Props');
  }

  componentDidUpdate() {
    console.log('    CONTAINER/MESSSAGES | Complete Rendering MESSSAGES');
  }

  render() {
    console.log('    CONTAINER/PROFILE | Rendering MESSSAGES Container...');
    return (
      <div>Messages</div>
    );
  }
}

export default Messages;
