import React, { Component, cloneElement } from 'react';
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

import Header from 'components/Header';
import Footer from 'components/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
    }
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

  componentDidMount() {
    if (isUserAuthenticated()) {
      this.props.getUnviewedMatches(getUsername());
      this.props.getUnreadMessages(getUsername());
      this.setState({ auth: true });
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
    console.log('this.props', this.props);
    const { asPath, open } = this.props;
    const { auth } = this.state;

    return (
      <div className="app">
        <Header
          auth={auth}
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
          {cloneElement(this.props.children)}
        </main>
        <Footer />
      </div>
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
