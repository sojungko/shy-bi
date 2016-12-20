import { FETCH_ALL_USERS } from '../actions/index';

const test = { user: 'Justin Garrison' }

export default function(state = [test], action) {
  switch(action.type) {
    case FETCH_ALL_USERS:
      return [ action.payload.data, ...state ];
  }
  return state;
}
