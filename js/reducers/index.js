import { combineReducers } from 'redux';
import ProfileReducer from './reducer-profile';

const rootReducer = combineReducers({
  profile: ProfileReducer
});

export default rootReducer;
