import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import UsersReducer from './reducer_users';

const rootReducer = combineReducers({
  users: UsersReducer
});

export default rootReducer;
