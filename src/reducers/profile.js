import { GET_USER } from '../actions';

console.log('REDUCER/PROFILE | Exporting PROFILE Reducer...');

export default function (state = {}, action) {
  // console.log(`    REDUCER/BLOGPOST | Received Action type: ${action.type} data: `, action.payload);
  console.log(`    REDUCER/PROFILE | Received Action type: ${action.type}`);
  switch (action.type) {
    case GET_USER:
      console.log('      REDUCER/PROFILE | Creating a new Profile State');
      return { ...state, ...action.payload };
    default:
      console.log('      REDUCER/PROFILE | Unknown Action type, no change has been made');
      return state;
  }
}

console.log('REDUCER/PROFILE | Exported PROFILE Reducer');
console.log(' ');
