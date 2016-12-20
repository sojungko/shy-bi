import { GET_USER } from '../actions/index';

export default function(state = [], action) {
  console.log('ACTION PAYLOAD IN GET USER : ', action.payload);
  switch(action.type) {
    case GET_USER:
      return [ action.payload.data[0], ...state ];
  }
  return state;
}
