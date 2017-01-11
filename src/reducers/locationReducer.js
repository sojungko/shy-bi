import { GET_LOCATIONS } from '../constants/ActionTypes';

export default function (state = [], action) {
  switch (action.type) {
    case GET_LOCATIONS:
      return action.payload;
    default:
      return state;
  }
}
