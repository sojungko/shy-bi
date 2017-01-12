import axios from 'axios';
import { EXPAND_CARD } from '../constants/ActionTypes';

const expandCard = (bool, msgID) => dispatch => axios.post('api/messages/read', { msgID })
    .then(() => {
      dispatch({ type: EXPAND_CARD, payload: { expanded: !bool, msgID } });
    });

export default expandCard;
