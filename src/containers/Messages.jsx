import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isUserAuthenticated, getUsername } from '../modules/auth';
import { getAllMessages } from '../actions/index';
import Message from '../components/Message';

class Messages extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  static propTypes = {
    getAllMessages: PropTypes.func.isRequired,
    messages: PropTypes.arrayOf(PropTypes.object.isRequired),
  }

  componentWillMount() {
    if (!isUserAuthenticated()) {
      this.context.router.push('/login');
    } else {
      const username = getUsername();
      this.props.getAllMessages(username);
    }
  }

  renderMessages() {
    return this.props.messages.map((message, index) => (
      <Message key={index} message={message} />
    ));
  }

  render() {
    return (
      <div>{this.renderMessages()}</div>
    );
  }
}

const mapStateToProps = ({ messages }) => ({ messages });
export default connect(mapStateToProps, { getAllMessages })(Messages);
