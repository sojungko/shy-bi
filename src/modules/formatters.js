export const formatDate = (value) => {
  if (!value) return value;
  const onlyNums = value.replace(/[^\d]/g, '');
  if (onlyNums.length === 2) {
    return `${onlyNums}/`;
  }
  if (onlyNums.length === 4) {
    return `${onlyNums.substring(0, 2)}/${onlyNums.substring(2)}/`;
  }
  if (onlyNums.length > 8) {
    return `${onlyNums.substring(0, 2)}/${onlyNums.substring(2, 4)}/${onlyNums.substring(4, 8)}`;
  }
};

export const formatSex = {
  male: 'Male',
  female: 'Female',
  other: 'Other',
};

export const formatEdLevel = {
  high_school: 'High School',
  some_college: 'Some College',
  bachelors: 'Bachelor\'s',
  masters: 'Master\'s',
  phd: 'Ph.D.',
};


export const formatData = (obj, key) => {
  switch (key) {
    case 'sex':
      return formatSex[obj[key]];
    case 'edLevel':
      return formatEdLevel[obj[key]];
    default:
      return obj[key];
  }
}

