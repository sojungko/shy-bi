import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import users from './users';
import profile from './profile';
import auth from './auth';


const rootReducer = combineReducers({
  form,
  profile,
  users,
  auth,
});

export default rootReducer;
