import { TOGGLE_SNACK_BAR } from '../constants/ActionTypes';

const INITIAL_STATE = { open: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_SNACK_BAR:
      return { ...state, open: action.payload };
    default:
      return state;
  }
}
