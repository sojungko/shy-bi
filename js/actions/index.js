import jwt from 'jwt-simple';
import axios from 'axios';


/* -- Fetching Users --*/
export function getAllUsers() {
  return dispatch => {
    axios.get('/api/search/all')
    .then(response => {
      dispatch({
        type: 'GET_ALL_USERS',
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

export function getUser(username) {
  return dispatch => {
    axios.get(`/api/users/${username}`)
    .then(response => {
      dispatch({
        type: 'GET_USER',
        payload: response.data
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }
}

export function searchUsers(props) {
  const request = axios.post('/api/search/filter', props);
  return { type: 'SEARCH_USERS', payload: request };
}


/* -- Signing in User--*/
export function signupUser(props) {
  const request = axios.post('/api/users/signup', props);
  return { type: 'SIGN_UP_USER', payload: request };
}


/* -- Logging in User--*/

export function loginUser(props) {
  axios.post('/api/users/signin', props)
  .then(response => {
    console.log('actions/index loginUser response : ', response)
    return {
      type: 'LOGIN_USER_SUCCESS',
      payload: response.username, //TODO replace with response.token when ready
    }
  });
};
