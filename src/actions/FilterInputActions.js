import * as A from '../constants/ActionTypes';

const updateMinAge = input => ({ type: A.UPDATE_MINAGE, payload: input });
const updateMaxAge = input => ({ type: A.UPDATE_MAXAGE, payload: input });
const updateCity = input => ({ type: A.UPDATE_CITY, payload: input });
const clearFields = () => ({ type: A.CLEAR_FIELDS });

export { updateMinAge, updateMaxAge, updateCity, clearFields };
