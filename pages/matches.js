import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { GET_MATCHES } from 'constants/action-types';
import { userFromCookie } from 'modules/cookies';

import App from 'components/App';
import UserList from 'components/UserList';

class Matches extends Component {
  static async getInitialProps({ req, store }) {
    let currentUser;
    let url = '/api/matches/';
    if (req) {
      const { cookies } = req;
      currentUser = userFromCookie(cookies);
      url = `${process.env.API_DOMAIN}${url}`;
    } else if (store && store.getState().currentUser) {
      ({ currentUser } = store.getState());
    }
    const { data } = await axios.get(`${url}${currentUser.username}`);
    store.dispatch({ type: GET_MATCHES, payload: data });
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

const mapStateToProps = ({ matches }) => ({ matches });

export default connect(mapStateToProps)(Matches);
