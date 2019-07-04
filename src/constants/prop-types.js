import {
  any,
  array,
  bool,
  func,
  instanceOf,
  number,
  object,
  shape,
  string,
} from 'prop-types';

export const userPropType = shape({
  username: string.isRequired,
  email: string.isRequired,
  liked: instanceOf(Set).isRequired,
  aboutMe: string,
  age: number,
  birthday: shape({
    day: number,
    month: number,
    year: number,
  }),
  edLevel: string,
  image_url: string,
  memberSince: shape({
    day: number,
    month: number,
    year: number,
  }),
  sex: string,
  online: bool,
});

export const fieldPropType = {
  input: shape({
    name: string,
    onBlur: func,
    onChange: func,
    onFocus: func,
    value: any,
  }),
  label: string,
  meta: shape({
    active: bool,
    data: object,
    dirty: bool,
    error: any,
    initial: any,
    invalid: bool,
    modified: bool,
    pristine: bool,
    submitError: any,
    submitFailed: bool,
    submitSucceeded: bool,
    submitting: bool,
    touched: bool,
    valid: bool,
    validating: bool,
    visited: bool,
  }),
  options: array,
  placeholder: string,
};
