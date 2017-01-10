import axios from 'axios';
import { deauthenticateUser } from '../modules/auth';

const logoutUser = (username) => {
  const request = { username };
  return dispatch => axios.post('/api/signout', request)
    .then(({ data }) => deauthenticateUser())
    .catch((error) => {
      console.log('      ACTIONS/LOGIN_USER_SUCCESS | ', error);
    });
};

export default logoutUser;
