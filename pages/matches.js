import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf } from 'prop-types';
import axios from 'axios';

import { GET_MATCHES } from 'constants/action-types';
import { userPropType } from 'constants/prop-types';

import App from 'components/App';
import UserList from 'components/UserList';

class Matches extends Component {
  static propTypes = {
    matches: arrayOf(userPropType),
  }

  static async getInitialProps({ req, store }) {
    const isServer = !!req;
    const { currentUser } = store.getState();
    const { username } = currentUser;
    const { data } = await axios.get(`${isServer ? process.env.API_DOMAIN : ''}/api/matches/${username}`);
    store.dispatch({ type: GET_MATCHES, payload: data });
    return {};
  }

  render() {
    const { matches } = this.props;
    return (
      <App>
        <h1>Your Matches</h1>
        <UserList users={matches.length ? matches : []} />
      </App>
    );
  }
}

const mapStateToProps = ({ matches }) => ({ matches });

export default connect(mapStateToProps)(Matches);
