import { combineReducers } from 'redux';

import { reducer as FormReducer } from 'redux-form';
import UsersReducer from './usersReducer';
import ProfileReducer from './profileReducer';
import AuthReducer from './authReducer';
import FilterReducer from './filterReducer';
import VisibleUsersReducer from './visibleUsersReducer';
import ActionsReducer from './actionsReducer';
import MessagesReducer from './messagesReducer';
import LeftNavReducer from './leftNavReducer';

const RootReducer = combineReducers({
  leftNavToggle: LeftNavReducer,
  form: FormReducer,
  users: UsersReducer,
  profile: ProfileReducer,
  auth: AuthReducer,
  filter: FilterReducer,
  visibleUsers: VisibleUsersReducer,
  actions: ActionsReducer,
  messages: MessagesReducer,
});

export default RootReducer;
