import { TOGGLE_SNACK_BAR } from '../constants/ActionTypes';

const toggleSnackbar = bool => ({ type: TOGGLE_SNACK_BAR, payload: !bool });

export default toggleSnackbar;
