import { FILTER_USERS_BY_SEX, FILTER_USERS_BY_MIN_AGE, FILTER_USERS_BY_MAX_AGE, FILTER_USERS_BY_CITY } from '../actions';

export default function (state = [], action) {
  switch (action.type) {
    case FILTER_USERS_BY_SEX:
      console.log('REDUCER/FILTER FILTER_USERS_BY_SEX action.payload: ', action.payload);
      return action.payload;
    case FILTER_USERS_BY_MIN_AGE:
      return action.payload;
    case FILTER_USERS_BY_MAX_AGE:
      return action.payload;
    case FILTER_USERS_BY_CITY:
      return action.payload;
    default:
      return state;
  }
}
