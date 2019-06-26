import React from 'react';
import Link from 'next/link';

const UserList = ({ users }) => (
  <ul>
    {users.map(({ username, image_url }) => (
      <Link>
        <a href="/">
          <li>
            <img role="presentation " src={image_url} />
            <div>Username: {username}</div>
          </li>
        </a>
      </Link>
    ))}
  </ul>
);


export default UserList;
