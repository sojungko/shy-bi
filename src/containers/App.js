import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';

import { getUsername, isUserAuthenticated } from 'modules/auth';
import {
  getUnviewedMatches,
  getAllMessages,
  getUnreadMessages,
  logoutUser,
  toggleLeftNav,
} from 'actions';

import Header from '../components/Header';
import LeftNav from '../components/LeftNav';
import Footer from '../components/Footer';

class App extends Component {
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

  // componentDidMount() {
  //   this.props.getUnviewedMatches(getUsername());
  //   this.props.getUnreadMessages(getUsername());
  // }

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
    console.log('this.props', this.props);
    return (
      <main className="main">
        <Header
          location={this.props.location.pathname}
          logOut={this.handleLogOut}
          handleToggle={this.handleToggle}
          numberOfMatches={this.props.unviewed}
          numberOfMessages={this.props.unread}
          handleClick={this.handleClick}
          handleTitleClick={() => this.context.router.push('/')}
        />
        <LeftNav
          open={this.props.open}
          handleToggle={this.handleToggle}
        />
        <div className="page">
          {this.props.children}
        </div>
        <Footer />
      </main>
    );
  }
}

function mapStateToProps({ leftNav, location, messages, badges }) {
  return {
    open: leftNav.open,
    received: messages.received,
    unread: badges.unread,
    unviewed: badges.unviewed,
    location,
  };
}

export default connect(mapStateToProps, {
  toggleLeftNav,
  getUnviewedMatches,
  getAllMessages,
  logoutUser,
  getUnreadMessages,
})(App);
