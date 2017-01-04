import { GET_ALL_USERS, SIGN_UP_USER, FILTER_USERS_BY_SEX, FILTER_USERS_BY_MIN_AGE, FILTER_USERS_BY_MAX_AGE, FILTER_USERS_BY_CITY } from '../actions';

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
    case FILTER_USERS_BY_SEX:
      console.log('     REDUCER/USERS | FILTER_USERS_BY_SEX existing state : ', [...state]);
      console.log('     REDUCER/USERS | FILTER_USERS_BY_SEX filtered state : ', [...state].filter((element) => {
        console.log('     REDUCER/USERS | FILTER_USERS_BY_SEX element.sex : ', element.sex);
        return element.sex === action.payload;
      }));
      console.log('    REDUCER/USERS | FILTER_USERS_BY_SEX action.payload : ', action.payload);
      return [...state].filter(element => element.sex === action.payload); // action.payload returns 'female' or 'male'
    case FILTER_USERS_BY_MIN_AGE:
      return [...state].filter(element => element.age >= action.payload); // action.payload returns number
    case FILTER_USERS_BY_MAX_AGE:
      return [...state].filter(element => element.age <= action.payload); // action.payload returns number
    case FILTER_USERS_BY_CITY:
      return [...state].filter(element => element.city === action.payload); // action.payload returns string
    default:
      console.log('      REDUCER/USERS | Unknown Action type, no change has been made');
      return state;
  }
}

console.log('REDUCER/USERS | Exported USERS Reducer');
console.log(' ');
