import * as types from './actionTypes';
import axios from 'axios';
import {
  pushState
} from 'redux-react-router';

const requestData = () => ({
  type: types.REQ_DATA
});
const receiveData = (json) => ({
  type: types.RECV_ERROR,
  data: json
});

export function fetchData(url) {
  return function (dispatch) {
    dispatch(requestData());
    return axios({
        url: url,
        timeout: 20000,
        method: 'get',
        responseType: 'json'
      })
      .then(function (response) {
        dispatch(receiveData(response.data));
      })
      .catch(function (response) {
        dispatch(receiveError(response.data));
        dispatch(pushState(null, '/error'));
      })
  }
}

// getUsers :: () -> json
const getUsers = () => {
  axios.get('http://localhost:8080/api/search/all')
  console.log(request)
  return {
    type: REQ_DATA,
    payload: request
  };
}


