import { FILTER_USERS_BY_SEX, FILTER_USERS_BY_MIN_AGE } from '../actions';

console.log('REDUCER/FILTER | Exporting FILTER Reducer...');

export default function (state = {}, action) {
  // console.log(`    REDUCER/USERS | Received Action type: ${action.type} data: `, action.payload);
  console.log(`    REDUCER/FILTER | Received Action type: ${action.type}`);
  switch (action.type) {
    case FILTER_USERS_BY_SEX:
      return action.payload;
    // case FILTER_USERS_BY_MIN_AGE:
    //   return action.payload;
    default:
      return state;
  }
}
