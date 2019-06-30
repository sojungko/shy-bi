import React from 'react';
import Link from 'next/link';

const UserList = ({ users }) => (
  <ul className="users">
    {users.map(({ username, image_url }) => (
      <Link>
        <a href="/" key="username">
          <li className="user">
            <div className="user--image-container">
              <img
                role="presentation"
                src={image_url}
                className="user--image"
              />
            </div>
            <p className="user--username">{username}</p>
          </li>
        </a>
      </Link>
    ))}
  </ul>
);


export default UserList;
