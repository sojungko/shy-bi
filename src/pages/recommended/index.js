import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router';

import App from 'components/App';
import UserList from 'components/UserList';

class Recommended extends Component {
  static async getInitialProps({ req, store }) {
    return {};
  }

  render() {
    const { recommended } = this.props;
    return (
      <App>
        <UserList users={recommended.length ? recommended : []} />
      </App>
    );
  }
}

export default connect()(Recommended);
