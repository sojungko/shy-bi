import { combineReducers } from 'redux';

import {
  users,
  currentUser,
  visitedUser,
  matches,
} from './users-reducer';

import profile from './profile-reducer';
import messages from './messages-reducer';
import badges from './badges-reducer';
import leftNav from './left-nav-reducer';
import filters from './filters-reducer';

const RootReducer = combineReducers({
  badges,
  currentUser,
  filters,
  leftNav,
  matches,
  messages,
  profile,
  users,
  visitedUser,
});

export default RootReducer;
