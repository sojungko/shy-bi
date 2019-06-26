import {
  GET_ALL_USERS,
  GET_RECOMMENDED_USERS,
  SIGN_UP_USER,
  GET_MATCHES,
  GET_LIKED_USERS,
  GET_CURRENT_USER,
  GET_VISITED_USER,
} from '../constants/action-types';

// const INITIAL_STATE = {
//   currentUser: null,
//   users: [],
//   recommended: [],
//   likes: [],
//   matches: [],
// };

// TODO: determine what this reducer is supposed to store
export function users(state = [], action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.payload;
    case GET_RECOMMENDED_USERS:
      return { ...state, recommended: action.payload };
    case GET_LIKED_USERS:
      return { ...state, likes: action.payload };
    default:
      return state;
  }
}

export function currentUser(state = null, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
    case SIGN_UP_USER:
      return action.payload;
    default:
      return state;
  }
}

export function visitedUser(state = null, action) {
  switch (action.type) {
    case GET_VISITED_USER:
      return action.payload;
    default:
      return state;
  }
}

export function matches(state = [], action) {
  switch (action.type) {
    case GET_MATCHES:
      return action.payload;
    default:
      return state;
  }
}
