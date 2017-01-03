export default function (state = [], action) {
  switch (action.type) {
    case 'GET_ALL_USERS':
      console.log('reducers/users action.payload : ', action.payload);
      return action.payload;
    case 'SIGN_UP_USER':
      console.log('reducers/users.js SIGN_UP_USER action.payload : ', action.payload);
      return action.payload;
    default:
      return state;
  }
}
