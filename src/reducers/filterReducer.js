import * as A from '../constants/ActionTypes';

export default function (state = [], action) {
  switch (action.type) {
    case A.FILTER_USERS_BY_SEX:
      console.log('REDUCER/FILTER FILTER_USERS_BY_SEX action.payload: ', action.payload);
      return action.payload;
    case A.FILTER_USERS_BY_MIN_AGE:
      return action.payload;
    case A.FILTER_USERS_BY_MAX_AGE:
      return action.payload;
    case A.FILTER_USERS_BY_CITY:
      return action.payload;
    default:
      return state;
  }
}
