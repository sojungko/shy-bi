import axios from 'axios';
import { browserHistory } from 'react-router';
const jwt = require('jwt-simple');

module.exports = {
  /* -- Fetching Users --*/
  getAllUsers() {
    return (dispatch) => {
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
  },

  getUser(username) {
    return (dispatch) => {
      axios.get(`/api/users/${username}`)
      .then(response => {
        console.log('actions/index getUser response.data : ', response.data);
        dispatch({
          type: 'GET_USER',
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    };
  },

  searchUsers(props) {
    const request = axios.post('/api/search/filter', props);
    return { type: 'SEARCH_USERS', payload: request };
  },

  /* -- Signing up User--*/
  signupUser(props) {
    return (dispatch) => {
      axios.post('/auth/signup', props)
      .then(response => {
        dispatch({ type: 'SIGN_UP_USER', payload: response.data });
        browserHistory.push('/search');
      })
      .catch(error => {
        console.log('actions/index signupUser error : ', error);
      });
    };
  },

  /* -- Logging in User--*/
  loginUserFailure(error) {
    return {
      type: 'LOGIN_USER_FAILURE',
      payload: error,
    }
  },

  loginUser(props) {
    // V.1
    // const request = axios.post('/api/users/signin', props);
    // return { type: 'LOGIN_USER_SUCCESS', payload: request };

    // V.2
    return (dispatch) => {
      console.log('actions/index loginUser props : ', props);
      axios.post('/auth/signin', props)
      .then((response) => {
        dispatch({ type: 'LOGIN_USER_SUCCESS', payload: response.data });
        browserHistory.push('/profile');
      })
      .catch((error) => {
        console.log('actions/index loginUser error : ', error);
      });
    };
  },
}
