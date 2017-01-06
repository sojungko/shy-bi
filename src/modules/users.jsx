import react from 'react';
import Likes from '../containers/Likes';
import UserListI

export default function renderUsers(users) {
  return users.map((user, idx) => 
    <User key={idx} user={user} />,
  );
}
