import { FILTER_USERS_BY_SEX, FILTER_USERS_BY_MIN_AGE, FILTER_USERS_BY_MAX_AGE, FILTER_USERS_BY_CITY } from '../actions';

export default function (users = [], filter) {
  switch (filter) {
    case FILTER_USERS_BY_SEX:
      return users.filter(user => user.sex === filter);
    case FILTER_USERS_BY_MIN_AGE:
      return users.filter(user => user.age >= filter);
    case FILTER_USERS_BY_MAX_AGE:
      return users.filter(user => user.age <= filter);
    case FILTER_USERS_BY_CITY:
      return users.filter(user => user.city === filter);
    default:
      return users;
  }
}
