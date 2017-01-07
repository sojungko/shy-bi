import React, { PropTypes } from 'react';
import { renderUsers } from '../modules/users';

const MutualLikes = ({ mutualLikes }) => (
  <div>
  </div>
);

MutualLikes.propTypes = {
  mutualLikes: PropTypes.arrayOf(PropTypes.object),
};

export default MutualLikes;
