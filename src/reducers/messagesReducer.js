import { GET_ALL_MESSAGES } from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
    case GET_ALL_MESSAGES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
