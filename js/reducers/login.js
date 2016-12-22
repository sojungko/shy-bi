export default function (state = [], action) {
  console.log('reducers/login action.payload : ', action.payload);
  switch (action.type) {
    case 'LOGIN_USER_SUCCESS':
      return action.payload;
    default:
      return state;
  }
}
