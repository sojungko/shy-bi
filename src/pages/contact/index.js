import React from 'react';
import { withRouter } from 'next/router';

import App from 'components/App';

const Contact = () => (
  <App>
    <div className="contact">
      <div className="contact__item">
        <label className="contact__label" for="name">Name</label>
        <input className="contact__input" />
      </div>
      <div className="contact__item">
        <label className="contact__label" for="email">Email</label>
        <input className="contact__input" type="email" />
      </div>
      <div className="contact__item">
        <label className="contact__label" for="message">Write us something sweet</label>
        <textarea className="contact__textarea" />
      </div>
    </div>
  </App>
  );

export default withRouter(Contact);
