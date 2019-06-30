import axios from 'axios';
import * as A from '../constants/action-types';

export const updateAgeRange = input => {
  const { min, max } = input;
  return dispatch => axios.get(`/api/search/filter?minage=${min}&maxage=${max}`)
    .then(({ data }) => dispatch({ type: A.UPDATE_AGE_RANGE, payload: data }))
    .catch((error) => {
      console.error(error);
    });
};
export const updateCity = input => ({ type: A.UPDATE_CITY, payload: input });
export const updateSex = input => ({ type: A.UPDATE_SEX, payload: input });
export const clearFields = () => ({ type: A.CLEAR_FIELDS });

export const filterUser = ({ minage, maxage, sex, city }) => {
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
