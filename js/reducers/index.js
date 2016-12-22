import { combineReducers } from 'redux';
<<<<<<< HEAD
import { reducer as FormReducer } from 'redux-form';
=======
import { reducer as SignupReducer } from 'redux-form';
>>>>>>> style: fix code style issues
import UsersReducer from './reducer_users';
import ProfileReducer from './reducer_profile';
<<<<<<< HEAD
import LogInReducer from './reducer_login.jsx';
=======
>>>>>>> 696bfd3b1930af53f13b636b40048877bea8281f

const rootReducer = combineReducers({
  profile: ProfileReducer,
<<<<<<< HEAD
  form: FormReducer,
  users: UsersReducer,
  login: LogInReducer,
=======
  form: SignupReducer,
  users: UsersReducer,
>>>>>>> style: fix code style issues
});

export default rootReducer;
