import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { getUsername, isUserAuthenticated } from '../modules/auth';
import { getUnviewedMatches, getAllMessages, getUnreadMessages, logoutUser } from '../actions';
import Header from '../components/Header';

import LeftNav from '../components/LeftNav';
import toggleLeftNav from '../actions/leftNavToggle';
import BottomNav from '../components/BottomNav';

class App extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    open: PropTypes.bool.isRequired,
    unviewed: PropTypes.number,
    toggleLeftNav: PropTypes.func,
    getUnviewedMatches: PropTypes.func,
    logoutUser: PropTypes.func,
    getUnreadMessages: PropTypes.func,
    unread: PropTypes.number,
  }

  componentWillMount() {
    injectTapEventPlugin();
    this.props.getUnviewedMatches(getUsername());
    this.props.getUnreadMessages(getUsername());
  }

  handleLogOut = () => this.props.logoutUser(getUsername())
    .then(() => {
      this.context.router.push('/');
    })

  handleToggle = () => this.props.toggleLeftNav(this.props.open);

  handleClick = path => this.context.router.push(path);

  forceUpdate() {
    this.forceUpdate();
  }

  render() {
    const currentUser = getUsername();
    const auth = isUserAuthenticated();
    return (
      <div>
        <Header
          location={this.props.location.pathname}
          auth={auth}
          logOut={this.handleLogOut}
          handleToggle={this.handleToggle}
          numberOfMatches={this.props.unviewed}
          numberOfMessages={this.props.unread}
          handleClick={this.handleClick}
          handleTitleClick={() => this.context.router.push('/')}
        />
        <LeftNav
          auth={auth}
          user={currentUser}
          open={this.props.open}
          handleToggle={this.handleToggle}
        />
        <div>
          {this.props.children}
        </div>
        <BottomNav />
      </div>
    );
  }
}

function mapStateToProps({ leftNavToggle, messages, badges }) {
  return {
    open: leftNavToggle.open,
    received: messages.received,
    unread: badges.unread,
    unviewed: badges.unviewed,
  };
}

export default connect(mapStateToProps, {
  toggleLeftNav,
  getUnviewedMatches,
  getAllMessages,
  logoutUser,
  getUnreadMessages,
})(App);
