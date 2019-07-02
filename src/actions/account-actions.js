import axios from 'axios';
import { authenticateUser, deauthenticateUser } from 'modules/auth';
import { setCookie, updateUserCookie, clearCookie } from 'modules/cookies';
import decorateUser from 'modules/user-decorator';
import * as A from '../constants/action-types';

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
