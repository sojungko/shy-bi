import { GET_ALL_MESSAGES, GET_SENT_MESSAGES, EXPAND_CARD } from '../constants/ActionTypes';

const INITIAL_STATE = { received: [], sent: [] };
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_MESSAGES:
      return { ...state, received: action.payload };
    case GET_SENT_MESSAGES:
      return { ...state, sent: action.payload };
    case EXPAND_CARD: {
      const newReceived = [...state.received];
      newReceived.forEach((message, index) => {
        if (message.msgID === action.payload.msgID) {
          newReceived[index].read = true;
        }
      });
      return { ...state, received: newReceived };
    }
    default:
      return state;
  }
}
