import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import UsersReducer from './reducer_users';
import ProfileReducer from './reducer_profile';
import LogInReducer from './reducer_login.jsx';


const rootReducer = combineReducers({
  profile: ProfileReducer,
  form: FormReducer,
  users: UsersReducer,
  login: LogInReducer,
});

export default rootReducer;
