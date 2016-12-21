import { GET_USER } from '../actions/index';

export default function(state = [], action) {
  console.log('ACTION PAYLOAD IN GET USER : ', action.payload);
  switch(action.type) {
    case GET_USER:
      return Object.assign({}, state, { // creating copy of state object so as not to mutate it
        user: action.payload.data
      });
  }
  return state;
}
