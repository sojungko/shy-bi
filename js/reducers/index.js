import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ProfileReducer from './reducer_profile';
import ActiveUser from './reducer_active_user';

const rootReducer = combineReducers({
  routing: routerReducer,
  ProfileReducer,
  ActiveUser
});

export default rootReducer;
