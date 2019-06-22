import { LOGIN_USER_SUCCESS } from '../constants/action-types';

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return { ...state, ...action.payload, isAuthenticated: true };
    default:
      return state;
  }
}
