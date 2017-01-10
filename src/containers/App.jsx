import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { getUsername, isUserAuthenticated } from '../modules/auth';
import { getMatches, getAllMessages } from '../actions';
import { logoutUser } from '../actions/auth';
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
    received: PropTypes.arrayOf(PropTypes.object),
    matches: PropTypes.arrayOf(PropTypes.object),
    toggleLeftNav: PropTypes.func,
    getMatches: PropTypes.func,
    getAllMessages: PropTypes.func,
    logoutUser: PropTypes.func,
  }

  componentWillMount() {
    injectTapEventPlugin();
    this.props.getMatches(getUsername());
    this.props.getAllMessages(getUsername());
  }

  handleLogOut = () => this.props.logoutUser(getUsername())
    .then(() => {
      this.context.router.push('/');
    })

  handleToggle = () => this.props.toggleLeftNav(this.props.open);

  handleClick = path => this.context.router.push(path);

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
          numberOfMatches={this.props.matches.length}
          numberOfMessages={this.props.received.length}
          handleClick={this.handleClick}
        />
        <LeftNav
          auth={auth}
          user={currentUser}
          open={this.props.open}
          handleToggle={this.handleToggle}
        />
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps({ leftNavToggle, messages, users }) {
  return {
    open: leftNavToggle.open,
    received: messages.received,
    matches: users.matches,
  };
}

export default connect(mapStateToProps, {
  toggleLeftNav,
  getMatches,
  getAllMessages,
  logoutUser,
})(App);
