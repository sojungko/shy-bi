import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as SignupReducer } from 'redux-form';
import UsersReducer from './reducer_users';
import ProfileReducer from './reducer_profile';


const rootReducer = combineReducers({
  profile: ProfileReducer,
  form: SignupReducer,
  users: UsersReducer
});

export default rootReducer;
