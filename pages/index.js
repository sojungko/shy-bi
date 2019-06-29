import React from 'react';
import { connect } from 'react-redux';

import App from 'components/App';
import Profile from 'components/Profile';

const Home = ({ currentUser }) => {
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
};

const mapStateToProps = ({ currentUser }) => ({
  currentUser,
});

export default connect(mapStateToProps)(Home);
