export const required = value => (value ? undefined : 'Required');

export const mustBeShorterThan = length =>
  value => (value.length < length ? undefined : `Must be fewer than ${length} characters`);

export const mustBeLongerThan = length =>
  value => (value.length > length ? undefined : `Must be more than ${length} characters`);

// for username
export const noSpecialChars
  = value => (/[^a-zA-Z0-9]/g.test(value) ? 'Must contain only letters and numbers' : undefined);

// for password
export const mustContainNumber =
  value => (/\d/g.test(value) ? undefined : 'Must contain a number');

export const mustContainLetter =
  value => (/[a-zA-Z]/g.test(value) ? undefined : 'Must contain a letter');

export const mustBeNumber =
  value => (isNaN(value) ? 'Must be a number' : undefined);

export const minValue = min =>
  value => (isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`);

export const email = value =>
  (/.+@.+\..+/g.test(value)
    ? undefined
  : 'Email looks a little weird');

const isLeapYear = year => (year % 100 === 0 ? year % 400 === 0 : year % 4 === 0);

const daysInMonth = year => ([
  31, // Jan
  isLeapYear(year) ? 29 : 28,
  31,
  30,
  31,
  30,
  31, // Jul
  31, // Aug
  30,
  31,
  30,
  31,
]);

export const validateDate = (date = '') => {
  const [day, month, year] = date.split('/');
  const numDay = Number(day);
  const numMonth = Number(month);
  const numYear = Number(year);

  if ((day && isNaN(numDay)) || (month && isNaN(numMonth)) || (year && isNaN(numYear))) {
    return 'Must be numbers only';
  }

  if (day && (numDay > 31 || numDay < 1)) {
    return 'Date doesn\'t look right';
  }

  if (month && (numMonth > 12 || numMonth < 1)) {
    return 'Month doesn\'t look right';
  }

  const currYear = new Date().getFullYear();

  if (year && (numYear < currYear - 100 || numYear > currYear)) {
    return 'Year doesn\'t look right';
  }

  if (day && month && year) {
    const daysAvail = daysInMonth(numYear)[numMonth - 1];
    if (numDay > daysAvail) {
      return 'Day doesn\'t look right';
    }
  }
};

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);
