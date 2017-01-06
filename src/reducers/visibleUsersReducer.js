import * as A from '../constants/ActionTypes';

export default function (users = [], filter) {
  switch (filter) {
    case A.FILTER_USERS_BY_SEX:
      console.log('REDUCER/VISIBLEUSERS FILTER_USERS_BY_SEX : ', users.filter(user => user.sex === filter));
      return users.filter(user => user.sex === filter);
    case A.FILTER_USERS_BY_MIN_AGE:
      return users.filter(user => user.age >= filter);
    case A.FILTER_USERS_BY_MAX_AGE:
      return users.filter(user => user.age <= filter);
    case A.FILTER_USERS_BY_CITY:
      return users.filter(user => user.city === filter);
    default:
      return users;
  }
}
