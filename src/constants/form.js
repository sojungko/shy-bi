import range from 'lodash.range';

export const genders = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

export const edLevels = [
  { label: 'High School', value: 'high_school' },
  { label: 'Some College', value: 'some_college' },
  { label: 'Bachelor\'s', value: 'bachelors' },
  { label: 'Masters\'s', value: 'masters' },
  { label: 'Ph.D.', value: 'phd' },
];

export const months = range(1, 13);

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

export const days = (month, year) => range(1, daysInMonth(year)[month - 1]);


const currYear = new Date().getFullYear();
const startYear = currYear - 100;

export const years = range(startYear, currYear);
