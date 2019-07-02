import axios from 'axios';
import { authenticateUser, deauthenticateUser } from 'modules/auth';
import { setCookie, updateUserCookie, clearCookie } from 'modules/cookies';
import decorateUser from 'modules/user-decorator';
import * as A from '../constants/action-types';

/* -- Fetching Users --*/
export function getAllUsers() {
  return dispatch => axios.get('/api/search/all')
    .then(({ data }) => dispatch({ type: A.GET_ALL_USERS, payload: data }))
    .catch((error) => {
      console.error(error);
    });
}

export function getCurrentUser(username) {
  return dispatch => axios.get(`/api/users/${username}`)
    .then(({ data }) => {
      const decoratedUser = decorateUser(data);
      console.log('getCurrentUser decorated', decoratedUser);
      updateUserCookie(decoratedUser);
      return dispatch({ type: A.GET_CURRENT_USER, payload: decoratedUser });
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getVisitedUser(username) {
  return dispatch => axios.get(`/api/users/${username}`)
    .then(({ data }) => dispatch({ type: A.GET_VISITED_USER, payload: decorateUser(data) }))
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
  const sending = {
    ...props,
    image_url: 'https://res.cloudinary.com/dm4fqf9nm/image/upload/v1484325145/default_profile-e08597880fc222202f22984a4f1966a29b108e856a3fb935072bfbbc302a4b73_h82hvb.png',
  };
  return dispatch => axios.post('/auth/signup', sending)
    .then(({ data }) => {
      authenticateUser(data.token, data.user.username);
      setCookie('user', JSON.stringify(data.user));
      return dispatch({ type: A.SIGN_UP_USER, payload: data.user });
    })
    .catch((error) => {
      console.log('actions/index signupUser error : ', error);
    });
}

export function loginUser(props) {
  return dispatch => axios.post('/auth/signin', props)
  .then(({ data }) => {
    authenticateUser(data.token, data.user.username);
    const decoratedUser = decorateUser(data.user);
    updateUserCookie(decoratedUser);
    return dispatch({ type: A.LOGIN_USER_SUCCESS, payload: decoratedUser });
  })
  .catch((error) => {
    console.log('      ACTIONS/LOGIN_USER_SUCCESS | ', error);
  });
}

export const logoutUser = (username) => {
  const request = { username };
  return dispatch => axios.post('/api/signout', request)
    .then(({ data }) => {
      deauthenticateUser();
      clearCookie('user');
      return dispatch({ type: A.LOGOUT_USER_SUCCESS, payload: data });
    })
    .catch((error) => {
      console.log('      ACTIONS/LOGIN_USER_SUCCESS | ', error);
    });
};

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
      if (data.isMatch) {
        return dispatch({ type: A.IS_MATCH, payload: data.liked });
      }
      return dispatch({ type: A.IS_NOT_MATCH, payload: data.liked });
    });
}

export function unlikeUser(username, userToUnlike) {
  return dispatch => axios.post('/api/users/unlike', { username, userToUnlike })
    .then(({ data }) => {
      return dispatch({ type: A.UNLIKE_USER, payload: data });
    })
    .catch((error) => {
      console.log('ACTIONS/UNLIKE_USER did not alter user data! ', error);
    });
}

/* -- Editing Bio -- */
export function editBio(props) {
  return (dispatch) => {
    return axios.post('/api/bio/edit_bio', props)
      .then(({ data }) => {
        const decoratedUser = decorateUser(data);
        updateUserCookie(decoratedUser);
        return dispatch({ type: A.EDIT_BIO_SUCCESS, payload: decoratedUser });
      })
      .catch((error) => {
        console.log('     ACTIONS/EDIT_BIO_SUCCESS User data was not edited | ', error);
      });
  };
}

export function deleteImage(props) {
  return (dispatch) => {
    const sending = { username: props };
    return axios.post('/api/bio/delete_image', sending)
      .then(({ data }) => {
        return dispatch({ type: A.IMAGE_DELETE_SUCCESS });
      })
      .catch((error) => {
        console.log('     3) ACTIONS/IMAGE_DELETE FAIL', error);
      });
  };
}

export function uploadImage(props) {
  return dispatch => axios.post('/api/bio/upload_image', props)
    .then(({ data }) => {
      return dispatch({ type: A.IMAGE_UPLOAD_SUCCESS, payload: data });
    })
    .catch((error) => {
      console.log('     ACTIONS/IMAGE_UPLOADS FAIL | ', error);
    });
}

export function getLocations(props) {
  const sending = { input: props };
  return dispatch => axios.post('/api/getlocations', sending)
    .then(({ data }) => {
      console.log('actions/getLocations data : ', data.predictions);
      const results = data.predictions.map(result => result.description);
      return dispatch({ type: A.GET_LOCATIONS, payload: results });
    });
}

export const expandCard = (bool, msgID) => dispatch => axios.post('api/messages/read', { msgID })
  .then(() => dispatch({ type: A.EXPAND_CARD, payload: { expanded: !bool, msgID } }));


export const getUnreadMessages = username => dispatch => axios.get(`api/messages/unread/${username}`)
  .then(({ data }) => dispatch({ type: A.GET_UNREAD_MESSAGES, payload: data.length }));

export const viewMatch = username => dispatch => axios.post('api/matches/view', { username })
  .then(() => dispatch({ type: A.VIEW_MATCH }));

export const getUnviewedMatches = username => dispatch => axios.get(`api/matches/newmatches/${username}`)
  .then(({ data }) => dispatch({ type: A.GET_UNVIEWED_MATCHES, payload: data.length }));
