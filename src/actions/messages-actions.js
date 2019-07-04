import axios from 'axios';
import debug from 'debug';
import * as A from '../constants/action-types';

const log = debug('client:messages-actions');

export function getAllMessages(username) {
  return dispatch => axios.get(`api/messages/all/${username}`)
    .then(({ data }) => dispatch({ type: A.GET_ALL_MESSAGES, payload: data }));
}

export function getSentMessages(username) {
  return dispatch => axios.get(`api/messages/sent/${username}`)
    .then(({ data }) => dispatch({ type: A.GET_SENT_MESSAGES, payload: data }));
}

export function sendMessage(message) {
  log(message);
  return () => axios.post('api/messages/send', message)
    .then(({ data }) => log(data));
}

export const getUnreadMessages = username => dispatch => axios.get(`api/messages/unread/${username}`)
  .then(({ data }) => dispatch({ type: A.GET_UNREAD_MESSAGES, payload: data.length }));
