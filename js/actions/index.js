import axios from 'axios';

export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_USER = 'GET_USER';
export const SIGN_UP_USER = 'SIGN_UP_USER';
export const LOG_IN_USER = 'LOG_IN_USER';
export const SEARCH_USERS = 'SEARCH_USERS';

export function getAllUsers() {
<<<<<<< HEAD
  return dispatch => {
    axios.get('/api/search/all')
    .then(response => {
=======
  return function (dispatch) {
    axios.get('http://localhost:8080/api/search/all')
    .then((response) => {
>>>>>>> 696bfd3b1930af53f13b636b40048877bea8281f
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
export function getUser(user) {

export function getUser(username) {
  return dispatch => {
    axios.get(`/api/users/${username}`)
    .then(response => {
      dispatch({
        type: GET_USER,
        payload: response.data
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }
}

export function signupUser(props) {
<<<<<<< HEAD
  const request = axios.post('/api/users/signup', props);

  return { type: SIGN_UP_USER, payload: request };
=======
  const request = axios.post('http://localhost:8080/api/users/signup', props);

  return {
    type: SIGN_UP_USER,
    payload: request,
  };
>>>>>>> 696bfd3b1930af53f13b636b40048877bea8281f
}

export function logIn(props) {
  axios.post('/api/users/signin', props)
    .then(response => {
      console.log('actions/index.js logIn response : ', response)
      return { type: LOG_IN_USER, payload: response }
    })
    .catch(error => {
      console.log('actions/index.js logIn error : ', error)
    })

}

export function searchUsers(props) {
  const request = axios.post('/api/search/filter', props);

  return { type: SEARCH_USERS, payload: request };
}
