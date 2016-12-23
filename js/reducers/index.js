import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import UsersReducer from './users';
// import ProfileReducer from './profile';
import LogInReducer from './login';


const rootReducer = combineReducers({
  form,
  // profile: ProfileReducer,
  users: UsersReducer,
  auth: LogInReducer,
});

export default rootReducer;
