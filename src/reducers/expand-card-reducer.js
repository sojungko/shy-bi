import { EXPAND_CARD } from '../constants/action-types';

const INITIAL_STATE = { expanded: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case EXPAND_CARD:
      return { ...state, expanded: action.payload.expanded };
    default:
      return state;
  }
}
