import axios from 'axios';

const GET_ALL_USERS = 'GET_ALL_USERS';
const GET_USER = 'GET_USER';
const SIGN_UP_USER = 'SIGN_UP_USER';
const LOG_IN_USER = 'LOG_IN_USER';

export function getAllUsers() {
  return function (dispatch) {
    axios.get('http://localhost:8080/api/search/all')
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

export function getUser(user) {
  const request = axios.get(`http://localhost:8080/api/users/:${user}`); // TODO need to be able to take in username and fetch data based on that

  return {
    type: GET_USER,
    payload: request,
  };
}

export function signupUser(props) {
  const request = axios.post('http://localhost:8080/api/users/signup', props);

  return {
    type: SIGN_UP_USER,
    payload: request,
  };
}

export function logIn(props) {
  const request = axios.post('http://localhost:8080/api/users/signin', props);

  return {
    type: LOG_IN_USER,
    payload: request,
  };
}
