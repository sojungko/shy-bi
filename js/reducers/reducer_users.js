import { FETCH_ALL_USERS } from '../actions_test/index';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_ALL_USERS:
      return [ action.payload.data, ...state ];
  }
  return state;
}
