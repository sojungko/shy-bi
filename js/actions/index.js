import axios from 'axios';

const GET_ALL_USERS = 'GET_ALL_USERS';
const GET_USER = 'GET_USER';
const SIGN_UP_USER = 'SIGN_UP_USER';

export function getAllUsers() {
  const request = axios.get('http://localhost:8080/api/search/all');

  return {
    type: GET_ALL_USERS,
    payload: request,
  };
}

export function getUser() {
  const request = axios.get('http://localhost:8080/api/users/:adam'); // TODO need to be able to take in username and fetch data based on that

  return {
    type: GET_USER,
    payload: request,
  };
}

export function signupUser(props) {
  const request = axios.post('http://localhost:8080/api/users/signup', props);

  return {
    type: SIGN_UP_USER,
    payload: request
  }
}
