import { FILTER_USERS_BY_SEX, FILTER_USERS_BY_MIN_AGE, FILTER_USERS_BY_MAX_AGE, FILTER_USERS_BY_CITY } from '../actions';

export default function (state = [], action) {
  switch (action.type) {
    case FILTER_USERS_BY_SEX:
      return FILTER_USERS_BY_SEX;
    case FILTER_USERS_BY_MIN_AGE:
      return FILTER_USERS_BY_MIN_AGE;
    case FILTER_USERS_BY_MAX_AGE:
      return FILTER_USERS_BY_MAX_AGE;
    case FILTER_USERS_BY_CITY:
      return FILTER_USERS_BY_CITY;
    default:
      return state;
  }
}
