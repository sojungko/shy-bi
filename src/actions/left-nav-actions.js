import { TOGGLE_LEFT_NAV } from '../constants/action-types';

export const toggleLeftNav = bool => ({
  type: TOGGLE_LEFT_NAV,
  payload: !bool,
});
