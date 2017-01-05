import axios from 'axios';
import { authenticateUser } from '../modules/auth';

export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_USER = 'GET_USER';
export const GET_RECOMMENDED_USERS = 'GET_RECOMMENDED_USERS';
export const LIKE_USER = 'LIKE_USER';
export const LIKED_USERS = 'LIKED_USERS';
export const FILTER_USERS = 'FILTER_USERS';
export const SIGN_UP_USER = 'SIGN_UP_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const FILTER_USERS_BY_SEX = 'FILTER_USERS_BY_SEX';
export const FILTER_USERS_BY_MIN_AGE = 'FILTER_USERS_BY_MIN_AGE';
export const FILTER_USERS_BY_MAX_AGE = 'FILTER_USERS_BY_MAX_AGE';
export const FILTER_USERS_BY_CITY = 'FILTER_USERS_BY_CITY';
export const GET_ALL_MESSAGES = 'GET_ALL_MESSAGES';

/* -- Fetching Users --*/
export function getAllUsers() {
  return dispatch => axios.get('/api/search/all')
    .then(({ data }) => dispatch({ type: GET_ALL_USERS, payload: data }))
    .catch((error) => {
      console.error(error);
    });
}

export function getUser(username) {
  return dispatch => axios.get(`/api/users/${username}`)
    .then(({ data }) => dispatch({ type: GET_USER, payload: data }))
    .catch((error) => {
      console.log(error);
    });
}

export function getRecommendedUsers(username) {
  return dispatch => axios.get(`/api/recommendations/${username}`)
    .then(({ data }) => dispatch({ type: GET_RECOMMENDED_USERS, payload: data }))
    .catch((error) => {
      console.error(error);
    });
}

export function likeUser(username, likedUser) {
  return dispatch => axios.post('/api/users/like', { username, likedUser })
    .then(({ data }) => {
      console.log(data);
      // TODO: DISPATCH ACTION TO REDUCER
    });
}

/* Fetch Liked Users */
// export function likedUsers(username) {
//   console.log(`      ACTIONS/Liked_USERS | Fetching User: ${username}`))
//
//   return (dispatch) => {
//     return axios.get(``)
//   }
// }

/* -- Filter users -- */
// Sends filter information to filter reducer

export const filterUsersBySex = filter => ({ type: FILTER_USERS_BY_SEX, payload: filter });
export const filterUsersByMinAge = filter => ({ type: FILTER_USERS_BY_MIN_AGE, payload: filter });
export const filterUsersByMaxAge = filter => ({ type: FILTER_USERS_BY_MAX_AGE, payload: filter });
export const filterUsersByCity = filter => ({ type: FILTER_USERS_BY_CITY, payload: filter });

/* -- Signing up User--*/
export function signupUser(props) {
  return dispatch => axios.post('/auth/signup', props)
    .then(({ data }) => {
      authenticateUser(data.token, data.user.username);
      return dispatch({ type: SIGN_UP_USER, payload: data });
    })
    .catch((error) => {
      console.log('actions/index signupUser error : ', error);
    });
}

export function loginUser(props) {
  return dispatch => axios.post('/auth/signin', props)
    .then(({ data }) => {
      authenticateUser(data.token, data.user.username);
      return dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
    })
    .catch((error) => {
      console.log('      ACTIONS/LOGIN_USER_SUCCESS | ', error);
    });
}

export function getAllMessages(username) {
  return dispatch => axios.get(`api/messages/all/${username}`)
    .then(messages => dispatch({ type: GET_ALL_MESSAGES, payload: messages }));
}
