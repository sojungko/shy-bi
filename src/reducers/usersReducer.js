import { GET_ALL_USERS, GET_RECOMMENDED_USERS, GET_LIKED_USERS } from '../constants/ActionTypes';

const INITIAL_STATE = { users: [], recommended: [], likes: [], matches: [] };
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, users: action.payload };
    // case SIGN_UP_USER:
    //   return action.payload;
    case GET_RECOMMENDED_USERS:
      return { ...state, recommended: action.payload };
    case GET_LIKED_USERS:
      return { ...state, likes: action.payload };
    default:
      return state;
  }
}
