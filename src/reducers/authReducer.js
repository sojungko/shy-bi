import { LOGIN_USER_SUCCESS } from '../actions';

console.log('REDUCER/AUTH | Exporting AUTH Reducer...');

export default function (state = {}, action) {
  // console.log(`    REDUCER/AUTH | Received Action type: ${action.type} data: `, action.payload);
  console.log(`    REDUCER/AUTH | Received Action type: ${action.type}`);

  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      console.log('      REDUCER/AUTH | Creating a new Auth State');
      return { ...state, ...action.payload, isAuthenticated: true };
    default:
      console.log('      REDUCER/AUTH | Unknown Action type, no change has been made');
      return state;
  }
}

console.log('REDUCER/AUTH | Exported AUTH Reducer');
console.log(' ');
