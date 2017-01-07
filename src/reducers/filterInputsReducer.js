import * as A from '../constants/ActionTypes';

const INITIAL_STATE = {
  minage: '',
  maxage: '',
  sex: '',
  city: 'New York',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case A.UPDATE_MINAGE:
      return { ...state, minage: action.payload };
    case A.UPDATE_MAXAGE:
      return { ...state, maxage: action.payload };
    case A.UPDATE_CITY:
      return { ...state, city: action.payload };
    case A.CLEAR_FIELDS:
      return { ...state, minage: '', maxage: '', sex: '', city: '' };
    default:
      return state;
  }
}
