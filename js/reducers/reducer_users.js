import { REQ_DATA } from '../actions/actionTypes';

export default function(state = [], action) {
  console.log('ACTION PAYLOAD : ', action.payload);
  switch(action.type) {
    case REQ_DATA:
      return [ action.payload, ...state ];
  }
  return state;
}
