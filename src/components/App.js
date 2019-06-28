import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';

import { getUsername, isUserAuthenticated } from 'modules/auth';
import {
  getAllMessages,
  getUnreadMessages,
  getUnviewedMatches,
  getCurrentUser,
  logoutUser,
  toggleLeftNav,
} from 'actions';

import Header from 'components/Header';
import Footer from 'components/Footer';

class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    open: PropTypes.bool.isRequired,
    unviewed: PropTypes.number,
    toggleLeftNav: PropTypes.func,
    getUnviewedMatches: PropTypes.func,
    logoutUser: PropTypes.func,
    getUnreadMessages: PropTypes.func,
    unread: PropTypes.number,
  }

  componentDidMount() {
    let isBootstrapped = false;
    if (!window.isLoaded) {
      if (isBootstrapped) return;

      isBootstrapped = true;

      if (isUserAuthenticated()) {
        const username = getUsername();
        this.props.getUnviewedMatches(username);
        this.props.getUnreadMessages(username);
        this.props.getCurrentUser(username);
      }
    }
  }

  handleLogOut = () => this.props.logoutUser(getUsername())
    .then(() => {
      Router.push('/');
    })

  handleToggle = () => this.props.toggleLeftNav(this.props.open);

  handleClick = path => Router.push(path);

  forceUpdate() {
    this.forceUpdate();
  }

  render() {
    // const currentUser = getUsername();
    // const auth = isUserAuthenticated();
    const { asPath, open } = this.props;

    return (
      <div className="app">
        <Header
          asPath={asPath}
          logOut={this.handleLogOut}
          handleToggle={this.handleToggle}
          numberOfMatches={this.props.unviewed}
          numberOfMessages={this.props.unread}
          handleClick={this.handleClick}
          handleTitleClick={() => Router.push('/')}
          open={open}
        />
        <main className="page">
          {this.props.children}
        </main>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps({ leftNav, messages, badges }) {
  return {
    open: leftNav.open,
    received: messages.received,
    unread: badges.unread,
    unviewed: badges.unviewed,
  };
}

export default connect(mapStateToProps, {
  getAllMessages,
  getUnreadMessages,
  getUnviewedMatches,
  getCurrentUser,
  logoutUser,
  toggleLeftNav,
})(App);
