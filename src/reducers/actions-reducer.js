import * as A from '../constants/action-types';

export default function (state = [], action) {
  switch (action.type) {
    case A.FILTER_USERS_BY_SEX:
      return A.FILTER_USERS_BY_SEX;
    case A.FILTER_USERS_BY_MIN_AGE:
      return A.FILTER_USERS_BY_MIN_AGE;
    case A.FILTER_USERS_BY_MAX_AGE:
      return A.FILTER_USERS_BY_MAX_AGE;
    case A.FILTER_USERS_BY_CITY:
      return A.FILTER_USERS_BY_CITY;
    default:
      return state;
  }
}
