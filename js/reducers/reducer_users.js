import { GET_ALL_USERS } from '../actions/index';

export default function(state = [], action) {
  console.log('ACTION PAYLOAD IN GET ALL USERS : ', action.payload);
  switch(action.type) {
    case GET_ALL_USERS:
      return Object.assign({}, state, { // creating copy of state object so as not to mutate it
        users: action.payload.data;
      });
  }
  return state;
}
