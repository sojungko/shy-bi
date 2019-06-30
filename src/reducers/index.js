import { combineReducers } from 'redux';

import {
  users,
  currentUser,
  visitedUser,
  matches,
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
  users,
  visitedUser,
});

export default RootReducer;
