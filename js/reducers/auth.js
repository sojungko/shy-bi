export default function (state = {}, action) {
  switch (action.type) {
    case 'LOGIN_USER_SUCCESS':
      return Object.assign({}, ...state, { username: action.payload.username, isAuthenticated: true });
    // case 'UNAUTH_USER':
    //   return { authenticated: false };
    // case 'LOGIN_USER_FAILURE':
    //   return { error: action.payload };
    default:
      return state;
  }
}
