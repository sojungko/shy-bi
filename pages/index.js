import React from 'react';
// import Link from 'next/link';
import { withRouter } from 'next/router';
import App from '../src/containers/App';

const Home = () => (
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

export default withRouter(Home);
