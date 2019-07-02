import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UNVISIT_USER } from 'constants/action-types';

import App from 'components/App';
import Profile from 'components/Profile';

class Home extends Component {
  static async getInitialProps({ store }) {
    if (store) {
      const { visitedUser } = store.getState();
      if (visitedUser) {
        store.dispatch({ type: UNVISIT_USER });
      }
    }
    return {};
  }

  render() {
    const { currentUser } = this.props;
    // if auth
    if (currentUser) {
      return (
        <App>
          <Profile currentUser={currentUser} />
        </App>
      );
    }
    
    return (
      <App>
        <div className="image-container">
          <img
            role="presentation"
            className="splash"
            src="../../styles/imgs/couple-1734001_1920.jpg"
          />
        </div>
      </App>
    );
  }
}

const mapStateToProps = ({ currentUser }) => ({
  currentUser,
});

export default connect(mapStateToProps)(Home);
