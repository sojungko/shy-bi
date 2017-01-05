import { GET_ALL_USERS, SIGN_UP_USER } from '../actions';

console.log('REDUCER/USERS | Exporting USERS Reducer...');

export default function (state = [], action) {
  switch (action.type) {
    case GET_ALL_USERS:
      // console.log(`    REDUCER/USERS | Received Action type: ${action.type}`, action);
      console.log(`    REDUCER/USERS | Received Action type: ${action.type}`);
      console.log('      REDUCER/USERS | Creating a new USER State');
      return action.payload;
    case SIGN_UP_USER:
      // console.log(`    REDUCER/USERS | Received Action type: ${action.type}`, action);
      console.log(`    REDUCER/USERS | Received Action type: ${action.type}`);
      console.log('      REDUCER/USERS | Creating a new USER State');
      return action.payload;
    default:
      return state;
  }
}

console.log('REDUCER/USERS | Exported USERS Reducer');
console.log(' ');
