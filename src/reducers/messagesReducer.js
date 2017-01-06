import { GET_ALL_MESSAGES } from '../constants/ActionTypes';

export default function (state = [], action) {
  switch (action.type) {
    case GET_ALL_MESSAGES:
      return [...action.payload];
    default:
      return state;
  }
}
