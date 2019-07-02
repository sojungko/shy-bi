import axios from 'axios';
import * as A from '../constants/action-types';

/* Fetch Matches */
export function getMatches(username) {
  return dispatch => axios.get(`/api/matches/${username}`)
    .then(({ data }) => dispatch({ type: A.GET_MATCHES, payload: data }))
    .catch(error => console.error(error));
}

export const viewMatch = username => dispatch => axios.post('api/matches/view', { username })
  .then(() => dispatch({ type: A.VIEW_MATCH }));

export const getUnviewedMatches = username => dispatch => axios.get(`api/matches/newmatches/${username}`)
  .then(({ data }) => dispatch({ type: A.GET_UNVIEWED_MATCHES, payload: data.length }));
