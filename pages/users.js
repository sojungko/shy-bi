import React, { Component } from 'react';
import { string, arrayOf, oneOfType } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import axios from 'axios';

import { GET_ALL_USERS, GET_VISITED_USER, UNVISIT_USER } from 'constants/action-types';
import { userPropType } from 'constants/prop-types';
import decorateUser from 'modules/user-decorator';

import App from 'components/App';
import Profile from 'components/Profile';
import UserList from 'components/UserList';
import SearchBar from 'components/SearchBar';

class Users extends Component {
  static propTypes = {
    asPath: string.isRequired,
    currentUser: userPropType,
    users: arrayOf(userPropType),
    visitedUser: oneOfType([userPropType, null]),
  }

  static async getInitialProps({ req = { params: {} }, query = {}, store, asPath }) {
    const isServer = !!req;
    const { params: { username } } = req;
    const visitedUser = username || query.username || null;

    if (visitedUser) {
      try {
        const { data } = await axios.get(`${isServer ? process.env.API_DOMAIN : ''}/api/users/${visitedUser}`);
        store.dispatch({ type: GET_VISITED_USER, payload: decorateUser(data) });
        return { asPath, visitedUser: data };
      } catch (err) {
        console.log('err', err);
        return { asPath };
      }
    }
    try {
      const { data } = await axios.get(`${isServer ? process.env.API_DOMAIN : ''}/api/search/all`);
      store.dispatch({ type: GET_ALL_USERS, payload: data });
      store.dispatch({ type: UNVISIT_USER });
    } catch (err) {
      console.log('err', err);
    }
    return { asPath };
  }

  render() {
    const { visitedUser, users } = this.props;

    if (visitedUser) {
      return (
        <App>
          <Profile visitedUser={visitedUser} />
        </App>
      );
    }

    return (
      <App>
        <section className="page__users">
          <SearchBar />
          <UserList users={users} />
        </section>
      </App>
    );
  }
}

function mapStateToProps({ visitedUser, users }) {
  return {
    visitedUser,
    users,
  };
}

export default connect(mapStateToProps)(withRouter(Users));
