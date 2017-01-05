import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isUserAuthenticated, getUsername } from '../modules/auth';
import { getAllMessages } from '../actions/index';

class Messages extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  static propTypes = {
    getAllMessages: PropTypes.func.isRequired,
  }

  componentWillMount() {
    if (!isUserAuthenticated()) {
      this.context.router.push('/login');
    } else {
      const username = getUsername();
      this.props.getAllMessages(username);
    }
  }

  render() {
    return (
      <div>Messages</div>
    );
  }
}

export default connect(null, { getAllMessages })(Messages);
