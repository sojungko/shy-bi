import React from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';


const UserListItem = ({ user }) => {
  const { username, image_url} = user;
  return (
    <Link>
      <a href="/">
        <li>
          <img role="presentation "src={image_url} />
          <div>Username: {username}</div>
        </li>
      </a>
    </Link>
  );
};

// UserListItem.propTypes = {
//   users: PropTypes.arrayOf(PropTypes.object),
//   handleClick: PropTypes.func,
// };

export default UserListItem;
