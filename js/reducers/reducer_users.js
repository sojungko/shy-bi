import { GET_ALL_USERS } from '../actions/index';

export default function(state = [], action) {
  switch(action.type) {
    case 'GET_ALL_USERS':
      return action.payload;
  }
  return state;
}
