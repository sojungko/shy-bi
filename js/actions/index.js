import axios from 'axios';

const GET_ALL_USERS = 'GET_ALL_USERS';
const GET_USER = 'GET_USER';

export function getAllUsers() {
  const request = axios.get('http://localhost:8080/api/search/all');

  console.log('SEARCH ALL : ', request);

  return {
    type: GET_ALL_USERS,
    payload: request
  }
}

export function getUser() {
  const request = axios.get('http://localhost:8080/api/users/:adam');

  return {
    type: GET_USER,
    payload: request
  }
}
