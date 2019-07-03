import { combineReducers } from 'redux';

import {
  currentUser,
  matches,
  recommended,
  users,
  visitedUser,
} from './users-reducer';

import messages from './messages-reducer';
import badges from './badges-reducer';
import leftNav from './left-nav-reducer';

const RootReducer = combineReducers({
  badges,
  currentUser,
  leftNav,
  matches,
  messages,
  recommended,
  users,
  visitedUser,
});

export default RootReducer;
