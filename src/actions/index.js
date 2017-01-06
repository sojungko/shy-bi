import axios from 'axios';
import { authenticateUser } from '../modules/auth';
import * as A from '../constants/ActionTypes';

/* -- Fetching Users --*/
export function getAllUsers() {
  return dispatch => axios.get('/api/search/all')
    .then(({ data }) => dispatch({ type: A.GET_ALL_USERS, payload: data }))
    .catch((error) => {
      console.error(error);
    });
}

export function getUser(username) {
  return dispatch => axios.get(`/api/users/${username}`)
    .then(({ data }) => dispatch({ type: A.GET_USER, payload: data }))
    .catch((error) => {
      console.log(error);
    });
}

export function getRecommendedUsers(username) {
  return dispatch => axios.get(`/api/recommendations/${username}`)
    .then(({ data }) => dispatch({ type: A.GET_RECOMMENDED_USERS, payload: data }))
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
export function likedUsers(username) {
  return (dispatch) => axios.get('/api/search/liked', { username })
    .then(({ data }) => dispatch({ type: A.LIKED_USERS, payload: data }))
    .catch((error) => console.error(error))
}

/* -- Filter Users -- */
// Sends filter information to filter reducer

export const filterUsersBySex = filter => ({ type: A.FILTER_USERS_BY_SEX, payload: filter });
export const filterUsersByMinAge = filter => ({ type: A.FILTER_USERS_BY_MIN_AGE, payload: filter });
export const filterUsersByMaxAge = filter => ({ type: A.FILTER_USERS_BY_MAX_AGE, payload: filter });
export const filterUsersByCity = filter => ({ type: A.FILTER_USERS_BY_CITY, payload: filter });

/* -- Signing up User--*/
export function signupUser(props) {
  return dispatch => axios.post('/auth/signup', props)
    .then(({ data }) => {
      authenticateUser(data.token, data.user.username);
      return dispatch({ type: A.SIGN_UP_USER, payload: data });
    })
    .catch((error) => {
      console.log('actions/index signupUser error : ', error);
    });
}

export function loginUser(props) {
  return dispatch => axios.post('/auth/signin', props)
    .then(({ data }) => {
      authenticateUser(data.token, data.user.username);
      return dispatch({ type: A.LOGIN_USER_SUCCESS, payload: data });
    })
    .catch((error) => {
      console.log('      ACTIONS/LOGIN_USER_SUCCESS | ', error);
    });
}

export function getAllMessages(username) {
  return dispatch => axios.get(`api/messages/all/${username}`)
    .then(({ data }) => dispatch({ type: A.GET_ALL_MESSAGES, payload: data }));
}

export function getSentMessages(username) {
  return dispatch => axios.get(`api/messages/sent/${username}`)
    .then(({ data }) => dispatch({ type: A.GET_SENT_MESSAGES, payload: data }));
}


/* -- Editing Bio -- */
export function editBio(props) {
  return dispatch => axios.post('/api/bio/edit_bio', props)
    .then(({ data }) => dispatch({ type: A.EDIT_BIO_SUCCESS, payload: data }))
    .catch((error) => {
      console.log('     ACTIONS/EDIT_BIO_SUCCESS | ', error);
    });
}

export function uploadImage(props) {
  console.log('     ACTIONS/UPLOAD IMAGE props | ', props);
  return dispatch => axios.post('/api/bio/upload_image', props)
    .then(({ data }) => dispatch({ type: A.IMAGE_UPLOAD_SUCCESS, payload: data }))
    .catch((error) => {
      console.log('     ACTIONS/IMAGE_UPLOAD_SUCCESS | ', error);
    });
}
