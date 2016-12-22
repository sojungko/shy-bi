import { LOG_IN_USER } from '../actions/index';

export default function(state = [], action) {
  console.log('action.payload : ', action.payload);
  switch(action.type) {
    case LOG_IN_USER :
      return action.payload;
  }
  return state;
}
