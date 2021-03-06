import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardContent from '@material-ui/core/CardContent';
// import Paper from '@material-ui/core/Paper';

import { isUserAuthenticated, getUsername } from 'modules/auth';
import { getAllMessages, getSentMessages, getUnreadMessages, expandCard } from 'actions';
import Navbar from 'components/Navbar';

class Messages extends Component {
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

  componentDidMount() {
    if (!isUserAuthenticated()) {
      Router.push('/home');
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
        <div>
          Love Letters
          {/* <CardHeader
            title="Love Letters"
            titleStyle={styles.title}
            subtitle="Exchange sweet nothings"
            subtitleStyle={styles.subtitle}
          /> */}
        </div>
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
