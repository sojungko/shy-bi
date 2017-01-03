export default function (state = {}, action) {
  switch (action.type) {
    case 'LOGIN_USER_SUCCESS':
      console.log('reducers/auth LOGIN_USER_SUCCESS action.payload : ', action.payload);
      return { ...state, ...action.payload, isAuthenticated: true };
    // case 'UNAUTH_USER':
    //   return { authenticated: false };
    // case 'LOGIN_USER_FAILURE':
    //   return { error: action.payload };
    default:
      return state;
  }
}
