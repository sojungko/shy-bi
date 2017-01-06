import React, { Children, Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { isUserAuthenticated, getUsername } from '../modules/auth';
import { getAllMessages, getSentMessages } from '../actions/index';
import Navbar from '../components/Navbar';

class Messages extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  static propTypes = {
    children: PropTypes.node,
    getAllMessages: PropTypes.func.isRequired,
    received: PropTypes.arrayOf(PropTypes.object.isRequired),
    sent: PropTypes.arrayOf(PropTypes.object.isRequired),
  }

  componentWillMount() {
    if (!isUserAuthenticated()) {
      this.context.router.push('/login');
    } else {
      const username = getUsername();
      this.props.getAllMessages(username);
      this.props.getSentMessages(username);
    }
  }

  render() {
    const messageMenu = [
      { label: 'received', path: 'messages/received' },
      { label: 'sent', path: 'messages/sent' },
      { label: 'send', path: 'messages/send' },
    ];

    const children = Children
      .map(this.props.children, child => React.cloneElement(child, {
        received: this.props.received,
        sent: this.props.sent,
      }));

    return (
      <div>
        <Navbar menus={messageMenu} />
        {children}
      </div>
    );
  }
}

const mapStateToProps = ({ messages }) => ({
  received: messages.received,
  sent: messages.sent,
});

export default connect(mapStateToProps, { getAllMessages, getSentMessages })(Messages);
