import React, { Children, Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { isUserAuthenticated, getUsername } from '../modules/auth';
import { getAllMessages, getSentMessages, getUnreadMessages, expandCard } from '../actions';
import Navbar from '../components/Navbar';

class Messages extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  static propTypes = {
    children: PropTypes.node,
    getAllMessages: PropTypes.func.isRequired,
    getSentMessages: PropTypes.func.isRequired,
    received: PropTypes.arrayOf(PropTypes.object.isRequired),
    sent: PropTypes.arrayOf(PropTypes.object.isRequired),
    expandCard: PropTypes.func,
    expanded: PropTypes.bool,
    getUnreadMessages: PropTypes.func,
  }

  componentWillMount() {
    if (!isUserAuthenticated()) {
      this.context.router.push('/home');
    } else {
      const username = getUsername();
      this.props.getAllMessages(username);
      this.props.getSentMessages(username);
    }
  }

  handleExpand = (message) => {
    this.props.expandCard(this.props.expanded, message.msgID)
    .then(() => {
      console.log('force updating');
      const username = getUsername();
      this.props.getAllMessages(username);
      this.props.getUnreadMessages(username);
    });
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
        handleExpand: this.handleExpand,
        expanded: this.props.expanded,
      }));

    return (
      <div>
        <Navbar menus={messageMenu} />
        {children}
      </div>
    );
  }
}

const mapStateToProps = ({ messages, card }) => ({
  received: messages.received,
  sent: messages.sent,
  expanded: card.expaned,
});

export default connect(mapStateToProps, {
  getAllMessages,
  getSentMessages,
  expandCard,
  getUnreadMessages,
})(Messages);
