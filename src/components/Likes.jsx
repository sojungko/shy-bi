import React, { PropTypes } from 'react';
import { renderUsers } from '../modules/users';

const MutualLikes = ({ likes }) => (
  <div>
  </div>
);

MutualLikes.propTypes = {
  likes: PropTypes.arrayOf(PropTypes.object),
};

export default MutualLikes;
