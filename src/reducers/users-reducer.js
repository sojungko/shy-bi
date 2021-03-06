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
  IMAGE_DELETE_SUCCESS,
  FILTER_USERS,
  IS_MATCH,
  IS_NOT_MATCH,
  UNLIKE_USER,
  UNVISIT_USER,
  IMAGE_UPLOAD_SUCCESS,
} from 'constants/action-types';

// TODO: determine what this reducer is supposed to store
export function users(state = [], action) {
  switch (action.type) {
    case GET_ALL_USERS:
    case FILTER_USERS:
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
    case IMAGE_DELETE_SUCCESS:
      return { ...state, image_url: undefined };
    case IMAGE_UPLOAD_SUCCESS:
      return { ...state, image_url: action.payload };
    case IS_NOT_MATCH:
    case IS_MATCH:
    case UNLIKE_USER:
      return { ...state, liked: new Set(action.payload) };
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
    case IS_MATCH:
      return { ...state, isMatch: true }; // TODO persist isMatch data somehow
    case UNLIKE_USER:
      return { ...state, isMatch: false };
    case UNVISIT_USER:
      return null;
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

export function recommended(state = [], action) {
  switch (action.type) {
    case GET_RECOMMENDED_USERS:
      return action.payload;
    default:
      return state;
  }
}
