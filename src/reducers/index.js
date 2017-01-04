import { combineReducers } from 'redux';

import UsersReducer from './usersReducer';
import ProfileReducer from './profileReducer';
import AuthReducer from './authReducer';
import FilterReducer from './filterReducer';

console.log('REDUCERS/ROOT | Exporting ROOT Reducer...');
console.log('REDUCERS/ROOT | Importing FormReducer');
console.log('REDUCERS/ROOT | Importing ProfileReducer');
console.log('REDUCERS/ROOT | Importing AuthReducer');

console.log('REDUCERS/ROOT | Cominbing all reducers');
console.log('REDUCERS/ROOT | Creating a new Application State');

const RootReducer = combineReducers({
  users: UsersReducer,
  profile: ProfileReducer,
  auth: AuthReducer,
  filter: FilterReducer,
});

export default RootReducer;
console.log('REDUCERS/ROOT | Exported ROOT Reducer');
console.log(' ');
