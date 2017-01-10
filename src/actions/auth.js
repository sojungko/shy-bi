import axios from 'axios';
import { deauthenticateUser } from '../modules/auth';

export function logoutUser(username) {
  const request = { username };
  return dispatch => axios.post('/api/signout', request)
    .then(({ data }) => {
      console.log('ACTION/LOGOUT USER :', data);
      return deauthenticateUser();
    })
    .catch((error) => {
      console.log('      ACTIONS/LOGIN_USER_SUCCESS | ', error);
    });
}
