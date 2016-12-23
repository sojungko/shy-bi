export default function(state = [], action) {
  console.log('reducers/profile action.payload : ', action.payload);
  switch(action.type) {
    case 'GET_USER':
      console.log('reducers/profile GET_USER action.payload : ', action.payload);
      return action.payload;
    default:
      return state;
  }
}
