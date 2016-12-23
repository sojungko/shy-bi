import axios from 'axios';
import { browserHistory } from 'react-router';

/* -- Fetching Users --*/
function getAllUsers() {
  return dispatch => {
    axios.get('/api/search/all')
    .then(response => {
      dispatch({
        type: 'GET_ALL_USERS',
        payload: response.data,
      });
    })
    .catch((error) => {
      console.error(error);
    });
  };
}

function getUser(username) {
  return dispatch => {
    axios.get(`/api/users/${username}`)
    .then(response => {
      console.log('actions/index getUser response : ', response);
      dispatch({
        type: 'GET_USER',
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  };
}

function searchUsers(props) {
  const request = axios.post('/api/search/filter', props);
  return { type: 'SEARCH_USERS', payload: request };
}

/* -- Signing in User--*/
function signupUser(props) {
  const request = axios.post('/api/users/signup', props);
  return { type: 'SIGN_UP_USER', payload: request };
}

/* -- Logging in User--*/

function loginUserFailure(error) {
  return {
    type: 'LOGIN_USER_FAILURE',
    payload: error,
  }
}

function loginUser(props) {
  /* V.1 -- does not reach reducer */
  // axios.post('/api/users/signin', props)
  //   .then(response => {
  //     // localStorage.setItem('token', response.data.token);
  //     console.log('actions/index loginUser response.status : ', response.status);
  //     browserHistory.push('/profile');
  //     return {
  //       type: 'LOGIN_USER_SUCCESS',
  //       payload: response.data,
  //     }
  //   })
  //   .catch(error => {
  //     console.log('action/index loginUser error : ', error);
  //   })

  /* V.2 -- returns a promise object that is not resolved */
  // const request = axios.post('/api/users/signin', props);
  // console.log('actions/index loginUser request : ', request);
  //
  // return {
  //   type: 'LOGIN_USER_SUCCESS',
  //   payload: request,
  // }

  /* V.3 -- does not reach reducer */
  return dispatch => {
    console.log('actions/index loginUser props : ', props);
    axios.post('/api/users/signin', props)
      .then(response => {
        console.log('actions/index loginUser response.data : ', response.data);
        dispatch({ type: 'LOGIN_USER_SUCCESS', payload: response.data});
        browserHistory.push('/search');
      })
      .catch(error => {
        console.log('actions/index loginUser error : ', error);
      })
  }
}


export { getAllUsers, getUser, searchUsers, signupUser, loginUserFailure, loginUser };
