import { combineReducers } from 'redux';

import users from './users-reducer';
import profile from './profile-reducer';
import auth from './auth-reducer';
import actions from './actions-reducer';
import messages from './messages-reducer';
import badges from './badges-reducer';
import leftNav from './left-nav-reducer';
import filters from './filter-inputs-reducer';
import location from './location-reducer';
import card from './expand-card-reducer';

const RootReducer = combineReducers({
  location,
  leftNav,
  users,
  profile,
  auth,
  actions,
  messages,
  filters,
  card,
  badges,
});

export default RootReducer;
