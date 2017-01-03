import axios from 'axios';
import { hashHistory } from 'react-router';
import jwt from 'jwt-simple';

console.log('ACTIONS | Exporting ACTIONS...');

export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_USER = 'GET_USER';
export const SEARCH_USERS = 'SEARCH_USERS';
export const SIGN_UP_USER = 'SIGN_UP_USER';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

/* -- Fetching Users --*/
export function getAllUsers() {
  console.log('      ACTIONS/GET_ALL_USERS | Fetching All Users');

  return (dispatch) => {
    console.log('      ACTIONS/GET_ALL_USERS | Making GET Request to BE: /api/search/all');

    axios.get('/api/search/all')
      .then(({ data }) => {
        console.log('      ACTIONS/GET_ALL_USERS | Recevied Data from BE: ', data);
        dispatch({ type: GET_ALL_USERS, payload: data });
      })
      .catch((error) => {
        console.error(error);
      });
  };
}

export function getUser(username) {
  console.log(`      ACTIONS/GET_USER | Fetching User: ${username}`);

  return (dispatch) => {
    console.log(`      ACTIONS/GET_USER | Making GET Request to BE: /api/users/${username}`);

    axios.get(`/api/users/${username}`)
      .then(({ data }) => {
        console.log(`      ACTIONS/GET_USER | Recevied Data from BE: ${data}`);
        dispatch({ type: GET_USER, payload: data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function searchUsers(props) {
  console.log('      ACTIONS/SEARCH_USERS | Searching Users', props);
  const request = axios.post('/api/search/filter', props);
  return { type: SEARCH_USERS, payload: request };
}

/* -- Signing up User--*/
export function signupUser(props) {
  console.log('      ACTIONS/SIGN_UP_USER | Signing Up: ', props);

  return (dispatch) => {
    console.log('      ACTIONS/SIGN_UP_USER | Making POST Request to BE: /auth/signup');

    axios.post('/auth/signup', props)
      .then(({ data }) => {
        console.log('      ACTIONS/SIGN_UP_USER | Recevied Data from BE: ', data);

        dispatch({ type: SIGN_UP_USER, payload: data });
      })
      .then(() => {
        console.log('      ACTIONS/SIGN_UP_USER | Success, Redirecting User to /profile');
        hashHistory.push('/profile');
      })
      .catch((error) => {
        console.log('actions/index signupUser error : ', error);
      });
  };
}

/* -- Logging in User--*/
export function loginUserFailure(error) {
  console.log('      ACTIONS/LOGIN_USER_FAILURE | Could not log in : ', error);
  return {
    type: LOGIN_USER_FAILURE,
    payload: error,
  };
}

export function loginUser(props) {
  // V.1
  // const request = axios.post('/api/users/signin', props);
  // return { type: 'LOGIN_USER_SUCCESS', payload: request };

  // V.2
  console.log('      ACTIONS/LOGIN_USER_SUCCESS | Logging in : ', props);

  return (dispatch) => {
    console.log('      ACTIONS/LOGIN_USER_SUCCESS | Making POST Request to BE: /auth/signin');

    axios.post('/auth/signin', props)
      .then(({ data }) => {
        console.log('      ACTIONS/LOGIN_USER_SUCCESS | Recevied Data from BE: ', data);
        console.log('      ACTIONS/LOGIN_USER_SUCCESS | Setting token to loca storage ', data.token);
        localStorage.setItem('token', data.token);
        dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
      })
      .then(() => {
        console.log('      ACTIONS/LOGIN_USER_SUCCESS | Success, Redirecting User to /profile');
        hashHistory.push('/profile');
      })
      .catch((error) => {
        console.log('      ACTIONS/LOGIN_USER_SUCCESS | ', error);
      });
  };
}

console.log('ACTIONS | Exported ACTIONS');
console.log(' ');
