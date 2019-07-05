import axios from 'axios';
import debug from 'debug';
import { updateUserCookie } from 'modules/cookies';
import decorateUser from 'modules/user-decorator';
import * as A from '../constants/action-types';

const log = debug('client:user-actions');
const err = log.extend('err');

/* -- Fetching Users --*/
export function getAllUsers() {
  return dispatch =>
    axios
      .get('/api/search/all')
      .then(({ data }) => dispatch({ type: A.GET_ALL_USERS, payload: data }))
      .catch(error => err(error));
}

export function getCurrentUser(username) {
  return dispatch =>
    axios
      .get(`/api/users/${username}`)
      .then(({ data }) => {
        const decoratedUser = decorateUser(data);
        log('getCurrentUser decorated', decoratedUser);
        updateUserCookie(decoratedUser);
        return dispatch({ type: A.GET_CURRENT_USER, payload: decoratedUser });
      })
      .catch(error => err(error));
}

export function getVisitedUser(username) {
  return dispatch =>
    axios
      .get(`/api/users/${username}`)
      .then(({ data }) =>
        dispatch({ type: A.GET_VISITED_USER, payload: decorateUser(data) })
      )
      .catch(error => err(error));
}

export function getRecommendedUsers(username) {
  return dispatch =>
    axios
      .get(`/api/recommendations/${username}`)
      .then(({ data }) =>
        dispatch({ type: A.GET_RECOMMENDED_USERS, payload: data })
      )
      .catch(error => err(error));
}

export function getLocations(props) {
  const sending = { input: props };
  return dispatch =>
    axios
      .post('/api/getlocations', sending)
      .then(({ data }) => {
        console.log('actions/getLocations data : ', data.predictions);
        const results = data.predictions.map(result => result.description);
        return dispatch({ type: A.GET_LOCATIONS, payload: results });
      })
      .catch(error => err(error));
}

export const expandCard = (bool, msgID) => dispatch =>
  axios
    .post('api/messages/read', { msgID })
    .then(() =>
      dispatch({ type: A.EXPAND_CARD, payload: { expanded: !bool, msgID } })
    )
    .catch(error => err(error));
