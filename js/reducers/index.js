import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import UsersReducer from './users';
import ProfileReducer from './profile';
import LogInReducer from './login';


const rootReducer = combineReducers({
  profile: ProfileReducer,
  form: FormReducer,
  users: UsersReducer,
  login: LogInReducer,
});

export default rootReducer;
