import React from 'react';
import { withRouter } from 'next/router';

import App from 'components/App';

const AboutUs = () => (
  <App>
    <div>
      <h1>SHYBI</h1>
      <p>The world is evolving to embrace more gays and lesbians.</p>
      <br />
      <p>We did not want bi people to feel left out.</p>
      <br />
      <br />
      <br />
      <p>'ShyBi' is a premium dating app for the sophisticated bicurious people.</p>
      <br />
      <br />
      <br />
      <p>No more shot-in-the-dark style dating.</p>
      <br />
      <p>'ShyBi' provides a safe platform for anyone to explore his or her sexual orientation.</p>
      <div>
        <a href="https://github.com/jw-garrison">
          JW Garrison
        </a>
        <p> Wife, daughter, and mom, in that order </p>
      </div>
      <div>
        <a href="https://github.com/sojungko">
        Sojung Park
        </a>
        <p>Worked as a journalist for five years in Korea before deciding to switch to programming.</p>
        <p>Regrets not having done that sooner.</p>
      </div>
      <div>
        <a href="https://github.com/peterschussheim">
          Peter Schussheim
        </a>
        <p>A gracefully aging white 30-something man</p>
      </div>
    </div>

  </App>
  );

export default withRouter(AboutUs);
