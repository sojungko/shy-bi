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
import card from './expand-card-reducer';

const RootReducer = combineReducers({
  badges,
  card,
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
