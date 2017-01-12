import { GET_UNREAD_MESSAGES } from '../constants/ActionTypes';

const INITIAL_STATE = { unread: 0 };
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_UNREAD_MESSAGES:
      return { ...state, unread: action.payload };
    default:
      return state;
  }
}
