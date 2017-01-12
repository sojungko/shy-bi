import axios from 'axios';
import * as A from '../constants/ActionTypes';

const getUnreadMessages = username => dispatch => axios.get(`api/messages/unread/${username}`)
  .then(({ data }) => dispatch({ type: A.GET_UNREAD_MESSAGES, payload: data.length }));

export default getUnreadMessages;
