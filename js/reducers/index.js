import { combineReducers } from 'redux';
import ProfileReducer from './reducer_profile';

const rootReducer = combineReducers({
  profile: ProfileReducer
});

export default rootReducer;
