import { combineReducers } from 'redux';
import ProfileReducer from './reducer_profile';
import ActiveUser from './reducer_active_user';

const rootReducer = combineReducers({
  profile: ProfileReducer,
  activeUser: ActiveUser
});

export default rootReducer;
