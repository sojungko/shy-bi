import axios from 'axios';
import { hashHistory } from 'react-router';
import jwt from 'jwt-simple';

console.log('ACTIONS | Exporting ACTIONS...');

export const GET_ALL_USERS = 'GET_ALL_USERS';

/* -- Fetching Users --*/
export function getAllUsers() {
  return (dispatch) => {
    axios.get('/api/search/all')
    .then((response) => {
      dispatch({
        type: GET_ALL_USERS,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.error(error);
    });
  };
}

export function getUser(username) {
  return (dispatch) => {
    axios.get(`/api/users/${username}`)
      .then((response) => {
        console.log('actions/index getUser response.data : ', response.data);
        dispatch({
          type: 'GET_USER',
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function searchUsers(props) {
  const request = axios.post('/api/search/filter', props);
  return { type: 'SEARCH_USERS', payload: request };
}

/* -- Signing up User--*/
export function signupUser(props) {
  return (dispatch) => {
    axios.post('/auth/signup', props)
      .then((response) => {
        dispatch({ type: 'SIGN_UP_USER', payload: response.data });
        hashHistory.push('/search');
      })
      .catch((error) => {
        console.log('actions/index signupUser error : ', error);
      });
  };
}

/* -- Logging in User--*/
export function loginUserFailure(error) {
  return {
    type: 'LOGIN_USER_FAILURE',
    payload: error,
  };
}

export function loginUser(props) {
  // V.1
  // const request = axios.post('/api/users/signin', props);
  // return { type: 'LOGIN_USER_SUCCESS', payload: request };

  // V.2
  return (dispatch) => {
    console.log('actions/index loginUser props : ', props);
    axios.post('/auth/signin', props)
      .then((response) => {
        console.log('actions/index loginUser resopnse.data : ', response.data);
        localStorage.setItem('token', response.data.token);
        dispatch({ type: 'LOGIN_USER_SUCCESS', payload: response.data });
      })
      .then(() => {
        hashHistory.push('/profile');
      })
      .catch((error) => {
        console.log('actions/index loginUser error : ', error);
      });
  };
}

console.log('ACTIONS | Exported ACTIONS');
console.log('');
