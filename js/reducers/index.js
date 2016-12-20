import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as SignupReducer } from 'redux-form';
import UsersReducer from './reducer_users';
import SelectedUser from './reducer_selected_user';

const rootReducer = combineReducers({
  signup: SignupReducer,
  users: UsersReducer,
  selectedUser: SelectedUser
});

export default rootReducer;
