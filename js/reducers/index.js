import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as SignupReducer } from 'redux-form';
import UsersReducer from './reducer_users';
import SelectedUser from './reducer_selected_user';
import ProfileReducer from './reducer_profile';


const rootReducer = combineReducers({
  profile: ProfileReducer,
  form: SignupReducer,
  users: UsersReducer,
  selectedUser: SelectedUser
});

export default rootReducer;
