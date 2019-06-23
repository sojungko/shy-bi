import React from 'react';
import { withRouter } from 'next/router';

import App from 'components/App';
import EditBio from 'components/EditBio';

const Account = () => (
  <App>
    <EditBio />
  </App>
);

export default withRouter(Account);
