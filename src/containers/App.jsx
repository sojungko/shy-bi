import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { getUsername, isUserAuthenticated, deauthenticateUser } from '../modules/auth';
import Header from '../components/Header';
import LeftNav from '../components/LeftNav';
import toggleLeftNav from '../actions/leftNavToggle';

class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    open: PropTypes.bool.isRequired,
    toggleLeftNav: PropTypes.func,
  }

  componentWillMount() {
    injectTapEventPlugin();
  }

  handleToggle = () => this.props.toggleLeftNav(this.props.open);

  render() {
    console.log(this.props);
    const currentUser = getUsername();
    const auth = isUserAuthenticated();
    return (
      <div>
        <Header
          location={this.props.location.pathname}
          auth={auth}
          logOut={deauthenticateUser}
          handleToggle={this.handleToggle}
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

function mapStateToProps({ leftNavToggle }) {
  return { open: leftNavToggle.open };
}

export default connect(mapStateToProps, { toggleLeftNav })(App);
