import React, { Component } from 'react';
import { arrayOf } from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import { GET_RECOMMENDED_USERS } from 'constants/action-types';
import { userPropType } from 'constants/prop-types';

import App from 'components/App';
import UserList from 'components/UserList';

class Recommended extends Component {
  static propTypes = {
    recommended: arrayOf(userPropType),
  }

  static async getInitialProps({ req, store }) {
    const isServer = !!req;
    const { currentUser } = store.getState();
    const { username } = currentUser;
    const { data } = await axios.get(`${isServer ? process.env.API_DOMAIN : ''}/api/recommendations/${username}`);
    store.dispatch({ type: GET_RECOMMENDED_USERS, payload: data });
    return {};
  }

  render() {
    const { recommended } = this.props;
    return (
      <App>
        <h1>Recommended for You</h1>
        <h3>Based on our special algorithm</h3>
        <UserList users={recommended.length ? recommended : []} />
      </App>
    );
  }
}

const mapStateToProps = ({ recommended }) => ({ recommended });

export default connect(mapStateToProps)(Recommended);
