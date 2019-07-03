import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { userFromCookie } from 'modules/cookies';
import { GET_RECOMMENDED_USERS } from 'constants/action-types';

import App from 'components/App';
import UserList from 'components/UserList';

class Recommended extends Component {
  static async getInitialProps({ req, store }) {
    let currentUser;
    let url = '/api/recommendations/';
    if (req) {
      const { cookies } = req;
      currentUser = userFromCookie(cookies);
      url = `${process.env.API_DOMAIN}${url}`;
    } else if (store && store.getState().currentUser) {
      ({ currentUser } = store.getState());
    }
    const { data } = await axios.get(`${url}${currentUser.username}`);
    store.dispatch({ type: GET_RECOMMENDED_USERS, payload: data });
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

const mapStateToProps = ({ recommended }) => ({ recommended });

export default connect(mapStateToProps)(Recommended);
