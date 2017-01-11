import { EXPAND_CARD } from '../constants/ActionTypes';

const expandCard = bool => ({ type: EXPAND_CARD, payload: !bool });

export default expandCard;
