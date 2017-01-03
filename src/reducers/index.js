import { combineReducers } from 'redux';

import { reducer as FormReducer } from 'redux-form';
import UsersReducer from './users';
import ProfileReducer from './profile';
import AuthReducer from './auth';

console.log('REDUCERS/ROOT | Exporting ROOT Reducer...');
console.log('REDUCERS/ROOT | Importing FormReducer');
console.log('REDUCERS/ROOT | Importing ProfileReducer');
console.log('REDUCERS/ROOT | Importing AuthReducer');

console.log('REDUCERS/ROOT | Cominbing all reducers');
console.log('REDUCERS/ROOT | Creating a new Application State');

const RootReducer = combineReducers({
  fomr: FormReducer,
  users: UsersReducer,
  profile: ProfileReducer,
  auth: AuthReducer,
});

export default RootReducer;
console.log('REDUCERS/ROOT | Exported ROOT Reducer');
console.log(' ');
