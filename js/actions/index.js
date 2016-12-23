import axios from 'axios';
import { browserHistory } from 'react-router';

/* -- Fetching Users --*/
function getAllUsers() {
  return dispatch => {
    axios.get('/api/search/all')
    .then(response => {
      dispatch({
        type: 'GET_ALL_USERS',
        payload: response.data,
      });
    })
    .catch((error) => {
      console.error(error);
    });
  };
}

function getUser(username) {
  return dispatch => {
    axios.get(`/api/users/${username}`)
    .then(response => {
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

function searchUsers(props) {
  const request = axios.post('/api/search/filter', props);
  return { type: 'SEARCH_USERS', payload: request };
}

/* -- Signing in User--*/
function signupUser(props) {
  const request = axios.post('/api/users/signup', props);
  return { type: 'SIGN_UP_USER', payload: request };
}

/* -- Logging in User--*/

function loginUserFailure(error) {
  return {
    type: 'LOGIN_USER_FAILURE',
    payload: error,
  }
}

export function loginUser(props) {
  axios.post('/api/users/signin', props)
    .then(response => {
      // localStorage.setItem('token', response.data.token);
      console.log('actions/index loginUser response : ', response);
      browserHistory.push('/search');
      return { type: 'LOGIN_USER_SUCCESS' };
    });
}


export { getAllUsers, getUser, searchUsers, signupUser, loginUserFailure };
