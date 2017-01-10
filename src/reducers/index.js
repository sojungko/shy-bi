import { combineReducers } from 'redux';

import { reducer as FormReducer } from 'redux-form';
import UsersReducer from './usersReducer';
import ProfileReducer from './profileReducer';
import AuthReducer from './authReducer';
import ActionsReducer from './actionsReducer';
import MessagesReducer from './messagesReducer';
import LeftNavReducer from './leftNavReducer';
import FilterInputsReducer from './filterInputsReducer';

const RootReducer = combineReducers({
  leftNavToggle: LeftNavReducer,
  form: FormReducer,
  users: UsersReducer,
  profile: ProfileReducer,
  auth: AuthReducer,
  actions: ActionsReducer,
  messages: MessagesReducer,
  filterInputs: FilterInputsReducer,
});

export default RootReducer;
