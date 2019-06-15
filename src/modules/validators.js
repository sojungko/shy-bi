export const required = value => (value ? undefined : 'Required');

export const mustBeShorterThan = length => value => (value.length < length ? undefined : `Must be fewer than ${length} characters`);

export const mustBeLongerThan = length => value => (value.length > length ? undefined : `Must be more than ${length} characters`);

// for username
export const noSpecialChars = value => (/[^a-zA-Z0-9]/g.test(value) ? 'Must contain only letters and numbers' : undefined);

// for password
export const mustContainNumber = value => (/\d/g.test(value) ? undefined : 'Must contain a number');

export const mustContainLetter = value => (/[a-zA-Z]/g.test(value) ? undefined : 'Must contain a letter');

export const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined);

export const minValue = min => value => isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);
