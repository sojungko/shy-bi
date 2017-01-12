import axios from 'axios';
import { EXPAND_CARD } from '../constants/ActionTypes';

const expandCard = (bool, message) => dispatch => axios.post('api/messages/read', { message })
    .then(() => dispatch({ type: EXPAND_CARD, payload: { expanded: !bool, message } }));

export default expandCard;
