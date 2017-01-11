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

/* Fetch Liked Users */
export function getLikedUsers(username) {
  return dispatch => axios.get(`/api/search/liked/${username}`)
    .then(({ data }) => dispatch({ type: A.GET_LIKED_USERS, payload: data }))
    .catch(error => console.error(error));
}

/* Fetch Matches */
export function getMatches(username) {
  return dispatch => axios.get(`/api/matches/${username}`)
    .then(({ data }) => dispatch({ type: A.GET_MATCHES, payload: data }))
    .catch(error => console.error(error));
}

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

export function sendMessage(message) {
  console.log('      ACTIONS/SEND_MESSAGE | ', message);
  return dispatch => axios.post('api/messages/send', message)
    .then(({ data }) => console.log(data));
}

export function likeUser(username, likedUser) {
  return dispatch => axios.post('/api/users/like', { username, likedUser })
    .then(({ data }) => {
      console.log(data);
      // const isMatch = data;
      // if (isMatch) {
      //   const request = {
      //     senderID: username,
      //     receiverID: likedUser,
      //     title: 'You have a match!',
      //     body: `${username} likes you back! Don't be a flake and send a message.`,
      //   };
      //   sendMessage(request);
      return dispatch({ type: A.IS_MATCH, payload: data });
    });
}

export function unlikeUser(username, userToUnlike) {
  return dispatch => axios.post('/api/users/unlike', { username, userToUnlike })
    .then(({ data }) => {
      console.info('Unliking: ', data);
      return dispatch({ type: A.UNLIKE_USER, payload: data });
    })
    .catch((error) => {
      console.log('ACTIONS/UNLIKE_USER did not alter user data! ', error);
    });
}

/* -- Editing Bio -- */
export function editBio(props) {
  return (dispatch) => {
    axios.post('/api/bio/edit_bio', props)
    .then(({ data }) => dispatch({ type: A.EDIT_BIO_SUCCESS, payload: data }))
    .catch((error) => {
      console.log('     ACTIONS/EDIT_BIO_SUCCESS User data was not edited | ', error);
    });
  };
}

export function deleteImage(props) {
  return (dispatch) => {
    const sending = { username: props };
    return axios.post('/api/bio/delete_image', sending)
      .then(({ data }) => dispatch({ type: A.IMAGE_DELETE_SUCCESS, payload: data }))
      .catch((error) => {
        console.log('     3) ACTIONS/IMAGE_DELETE FAIL', error);
      });
  };
}

export function uploadImage(props) {
  return dispatch => axios.post('/api/bio/upload_image', props)
    .then(({ data }) => dispatch({ type: A.IMAGE_UPLOAD_SUCCESS, payload: data }))
    .catch((error) => {
      console.log('     ACTIONS/IMAGE_UPLOADS FAIL | ', error);
    });
}
