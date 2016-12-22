import { GET_USER } from '../actions/index';

export default function(state = [], action) {
  switch(action.type) {
    case GET_USER:
      return action.payload;
  }
  return state;
}
