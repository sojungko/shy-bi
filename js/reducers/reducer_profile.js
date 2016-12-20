import { GET_USER } from '../actions/actionTypes';

export default function(state = [], action) {
  console.log('ACTION PAYLOAD : ', action.payload);
  switch(action.type) {
    case GET_USER:
      return [ action.payload.data, ...state ];
  }
  return state;
}
