import { GET_USER, IS_MATCH } from '../constants/ActionTypes';

export default function (state = { isMatch: false }, action) {
  switch (action.type) {
    case GET_USER:
      // console.log(`    REDUCER/PROFILE | Received Action type: ${action.type}`, action);
      console.log(`    REDUCER/PROFILE | Received Action type: ${action.type}`);
      console.log('      REDUCER/PROFILE | Creating a new PROFILE State');
      return action.payload;
    case IS_MATCH:
      return { ...state, isMatch: action.payload };
    default:
      return state;
  }
}
