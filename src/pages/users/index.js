import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router';
import axios from 'axios';

import { GET_ALL_USERS } from 'constants/action-types';

import App from 'components/App';
import Profile from 'components/Profile';
import UserList from 'components/UserList';
import SearchBar from 'components/SearchBar';

class Users extends Component {
  static async getInitialProps({ req = { params: {} }, query = {}, store, asPath }) {
    const isServer = !!req;
    const { params: { username } } = req;
    const visitedUser = username || query.username || null;

    if (visitedUser) {
      try {
        const { data } = await axios.get(`${isServer ? process.env.API_DOMAIN : ''}/api/users/${visitedUser}`);
        store.dispatch({ type: 'GET_VISITED_USER', data });
      } catch (err) {
        console.log('err', err);
      }
    } else {
      try {
        const { data } = await axios.get(`${isServer ? process.env.API_DOMAIN : ''}/api/users/`);
        store.dispatch({ type: GET_ALL_USERS, data });
      } catch (err) {
        console.log('err', err);
      }
    }
    return { asPath };
  }

  componentDidMount() {
    const { visitedUser, asPath } = this.props;
    if (!visitedUser && asPath.split('/').length) {
      Router.replace('/users');
    }
  }

  render() {
    const { currentUser, visitedUser, users } = this.props;

    if (visitedUser) {
      return (
        <App>
          <Profile currentUser={currentUser} visitedUser={visitedUser} />
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
