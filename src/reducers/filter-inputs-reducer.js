import * as A from '../constants/action-types';

const INITIAL_STATE = {
  minage: 19,
  maxage: 100,
  sex: '',
  city: 'New York',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case A.UPDATE_AGE_RANGE:
      return { ...state, minage: action.payload.min, maxage: action.payload.max };
    case A.UPDATE_CITY:
      return { ...state, city: action.payload };
    case A.UPDATE_SEX:
      return { ...state, sex: action.payload };
    case A.CLEAR_FIELDS:
      return { ...state, minage: '', maxage: '', sex: '', city: '' };
    default:
      return state;
  }
}
