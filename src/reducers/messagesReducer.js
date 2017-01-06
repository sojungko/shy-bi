import { GET_ALL_MESSAGES, GET_SENT_MESSAGES } from '../constants/ActionTypes';

const INITIAL_STATE = { received: [], sent: [] };
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_MESSAGES:
      return { ...state, received: action.payload };
    case GET_SENT_MESSAGES:
      return { ...state, sent: action.payload };
    default:
      return state;
  }
}
