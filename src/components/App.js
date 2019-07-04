import React, { Component } from 'react';
import { node, bool, number, func } from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';
import { getUsername, isUserAuthenticated } from 'modules/auth';
import {
  getAllMessages,
  getCurrentUser,
  getUnreadMessages,
  getUnviewedMatches,
  logoutUser,
  toggleLeftNav,
} from 'actions';

import Header from 'components/Header';
import Footer from 'components/Footer';

class App extends Component {
  static propTypes = {
    asPath: string,
    children: node.isRequired,
    getUnreadMessages: func,
    getUnviewedMatches: func,
    logoutUser: func,
    open: bool.isRequired,
    toggleLeftNav: func,
    unread: number,
    unviewed: number,
  };

  componentDidMount() {
    let isBootstrapped = false;
    if (!window.isLoaded) {
      if (isBootstrapped) return;

      isBootstrapped = true;

      if (isUserAuthenticated() && !this.props.currentUser) {
        const username = getUsername();
        // this.props.getUnviewedMatches(username);
        // this.props.getUnreadMessages(username);
        this.props.getCurrentUser(username);
      }
    }
  }

  handleLogOut = () =>
    this.props.logoutUser(getUsername()).then(() => {
      Router.push('/');
    });

  handleToggle = () => this.props.toggleLeftNav(this.props.open);

  render() {
    const { asPath, children, open } = this.props;

    return (
      <div className="app">
        <Header
          asPath={asPath}
          logOut={this.handleLogOut}
          handleToggle={this.handleToggle}
          // numberOfMatches={this.props.unviewed}
          // numberOfMessages={this.props.unread}
          open={open}
        />
        <main className="page">{children}</main>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps({ leftNav, badges }) {
  return {
    open: leftNav.open,
    unread: badges.unread,
    unviewed: badges.unviewed,
  };
}

export default connect(
  mapStateToProps,
  {
    getAllMessages,
    getUnreadMessages,
    getUnviewedMatches,
    getCurrentUser,
    logoutUser,
    toggleLeftNav,
  }
)(App);
