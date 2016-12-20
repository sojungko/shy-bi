import { GET_ALL_USERS } from '../actions/actionTypes';

export default function(state = [], action) {
  console.log('ACTION PAYLOAD : ', action.payload);
  switch(action.type) {
    case GET_ALL_USERS:
      return [ action.payload.data, ...state ];
  }
  return state;
}
