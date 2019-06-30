import React from 'react';
import Link from 'next/link';

const UserList = ({ users }) => {
  return (
    <ul className="users">
      {users.map(({ username, image_url }) => {
        return (
          <Link href={`/users?username=${username}`} as={`/users/${username}`}>
            <a key="username">
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
        );
      })}
    </ul>
  );
};


export default UserList;
