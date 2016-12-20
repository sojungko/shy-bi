import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import UsersReducer from './reducer_users';
import SelectedUser from './reducer_selected_user';

const rootReducer = combineReducers({
  users: UsersReducer,
  selectedUser: SelectedUser
});

export default rootReducer;
