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

  renderList() {
    return this.props.messages.map((message, index) => (
      <div key={index}>
        <h4>Sent By: {message.sentBy}</h4>
        <h5>Title: {message.title}</h5>
        <p>Body: {message.body}</p>
      </div>
      ),
    );
  }

  render() {
    return (
      <div>{this.renderList()}</div>
    );
  }
}

const mapStateToProps = ({ messages }) => ({ messages });
export default connect(mapStateToProps, { getAllMessages })(Messages);
