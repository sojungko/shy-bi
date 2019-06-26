import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router';

import App from 'components/App';
import UserList from 'components/UserList';

class Matches extends Component {
  static async getInitialProps({ req, store }) {
    return {};
  }

  render() {
    const { matches } = this.props;
    return (
      <App>
        <UserList users={matches.length ? matches : []} />
      </App>
    );
  }
}

export default connect()(Matches);
