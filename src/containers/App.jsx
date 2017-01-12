import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { getUsername, isUserAuthenticated } from '../modules/auth';
import { getMatches, getAllMessages, getUnreadMessages, logoutUser } from '../actions';
import Header from '../components/Header';

import LeftNav from '../components/LeftNav';
import toggleLeftNav from '../actions/leftNavToggle';

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
    matches: PropTypes.arrayOf(PropTypes.object),
    toggleLeftNav: PropTypes.func,
    getMatches: PropTypes.func,
    logoutUser: PropTypes.func,
    getUnreadMessages: PropTypes.func,
    unread: PropTypes.number,
  }

  componentWillMount() {
    injectTapEventPlugin();
    this.props.getMatches(getUsername());
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
      <div style={{ backgroundColor: '#FAFAFA' }}>
        <Header
          location={this.props.location.pathname}
          auth={auth}
          logOut={this.handleLogOut}
          handleToggle={this.handleToggle}
          numberOfMatches={this.props.matches.length}
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
        <div style={{ marginTop: '70px' }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ leftNavToggle, messages, users, badges }) {
  return {
    open: leftNavToggle.open,
    received: messages.received,
    matches: users.matches,
    unread: badges.unread,
  };
}

export default connect(mapStateToProps, {
  toggleLeftNav,
  getMatches,
  getAllMessages,
  logoutUser,
  getUnreadMessages,
})(App);
