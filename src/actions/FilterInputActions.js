import axios from 'axios';
import * as A from '../constants/ActionTypes';

const updateMinAge = input => ({ type: A.UPDATE_MINAGE, payload: input });
const updateMaxAge = input => ({ type: A.UPDATE_MAXAGE, payload: input });
const updateCity = input => ({ type: A.UPDATE_CITY, payload: input });
const updateSex = input => ({ type: A.UPDATE_SEX, payload: input });
const clearFields = () => ({ type: A.CLEAR_FIELDS });

const filterUser = ({ minage, maxage, sex, city }) => {
  let url = '/api/search/filter?';

  !minage ? minage = 19 : minage < 19 ? minage = 19 : minage;
  !maxage ? maxage = 100 : maxage < minage ? maxage = minage : maxage;
  url += `minage=${minage}&maxage=${maxage}&`;

  if (sex) {
    url += `sex=${sex}&`;
  }

  if (city) {
    url += `city=${city}`;
  }

  return dispatch => axios.get(url)
    .then(({ data }) => dispatch({ type: A.GET_ALL_USERS, payload: data }))
    .catch((error) => {
      console.error(error);
    });
};

export { updateMinAge, updateMaxAge, updateCity, updateSex, clearFields, filterUser };
