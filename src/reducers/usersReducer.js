import { GET_ALL_USERS, SIGN_UP_USER } from '../actions';

console.log('REDUCER/USERS | Exporting USERS Reducer...');

export default function (state = [], action) {
  // console.log(`    REDUCER/USERS | Received Action type: ${action.type} data: `, action.payload);
  console.log(`    REDUCER/USERS | Received Action type: ${action.type}`);

  switch (action.type) {
    case GET_ALL_USERS:
      console.log('      REDUCER/USERS | Creating a new Auth State');
      return action.payload;
    case SIGN_UP_USER:
      console.log('      REDUCER/USERS | Creating a new Auth State');
      return action.payload;
    default:
      console.log('      REDUCER/USERS | Unknown Action type, no change has been made');
      return state;
  }
}

console.log('REDUCER/USERS | Exported USERS Reducer');
console.log(' ');
