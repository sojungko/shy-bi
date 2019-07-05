import axios from 'axios';
import debug from 'debug';
import * as A from '../constants/action-types';

const log = debug('client:filters-actions');
const err = log.extend('error');

export const clearFields = () => ({ type: A.CLEAR_FIELDS });

export const filterUsers = ({ minage, maxage, sex }) => {
  let url = '/api/search/filter?';

  url += `minage=${minage}&maxage=${maxage}&`;

  const { Male, Female, Other } = sex;

  url += `sex=${Male ? 'Male,' : ''}${Female ? 'Female,' : ''}${
    Other ? 'Other,' : ''
  }`;

  return dispatch =>
    axios
      .get(url)
      .then(({ data }) => dispatch({ type: A.FILTER_USERS, payload: data }))
      .catch(error => {
        err(error);
      });
};
