import { combineReducers } from 'redux';

import { reducer as FormReducer } from 'redux-form';
import UsersReducer from './usersReducer';
import ProfileReducer from './profileReducer';
import AuthReducer from './authReducer';
import { FILTER_USERS } from '../actions/index';

console.log('REDUCERS/ROOT | Exporting ROOT Reducer...');
console.log('REDUCERS/ROOT | Importing FormReducer');
console.log('REDUCERS/ROOT | Importing ProfileReducer');
console.log('REDUCERS/ROOT | Importing AuthReducer');

console.log('REDUCERS/ROOT | Cominbing all reducers');
console.log('REDUCERS/ROOT | Creating a new Application State');

const RootReducer = combineReducers({
  form: FormReducer.plugin({
    search: (state, action) => {
      console.log(`REDUCER/FORM | Received Action type: ${action.type}`);
      switch (action.type) {
        case FILTER_USERS:
          console.log('REDUCER/FORM | FILTER_USERS action.payload : ', action.payload);
          return action.payload;
        default:
          return state;
      }
    },
  }),
  users: UsersReducer,
  profile: ProfileReducer,
  auth: AuthReducer,
});

export default RootReducer;
console.log('REDUCERS/ROOT | Exported ROOT Reducer');
console.log(' ');
