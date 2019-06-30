import {
  GET_ALL_USERS,
  GET_RECOMMENDED_USERS,
  SIGN_UP_USER,
  GET_MATCHES,
  GET_LIKED_USERS,
  GET_CURRENT_USER,
  GET_VISITED_USER,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  EDIT_BIO_SUCCESS,
  UPDATE_AGE_RANGE,
} from '../constants/action-types';

// TODO: determine what this reducer is supposed to store
export function users(state = [], action) {
  switch (action.type) {
    case GET_ALL_USERS:
    case UPDATE_AGE_RANGE:
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
    case LOGIN_USER_SUCCESS:
    case SIGN_UP_USER:
    case EDIT_BIO_SUCCESS:
      return action.payload;
    case LOGOUT_USER_SUCCESS:
      return null;
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
