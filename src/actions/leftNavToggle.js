import { TOGGLE_LEFT_NAV } from '../constants/ActionTypes';

const toggleLeftNav = bool => ({ type: TOGGLE_LEFT_NAV, payload: !bool });

export default toggleLeftNav;
