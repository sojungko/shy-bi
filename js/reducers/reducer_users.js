import { REQ_DATA } from '../actions/index';

const test = { user: 'Justin Garrison' }

export default function(state = [test], action) {
  switch(action.type) {
    case REQ_DATA:
      return [ action.payload.data, ...state ];
  }
  return state;
}
