export const formatDateForInput = value => {
  if (!value) return value;
  const onlyNums = value.replace(/[^\d]/g, '');
  if (onlyNums.length === 2) {
    return `${onlyNums}/`;
  }
  if (onlyNums.length === 4) {
    return `${onlyNums.substring(0, 2)}/${onlyNums.substring(2)}/`;
  }
  if (onlyNums.length > 8) {
    return `${onlyNums.substring(0, 2)}/${onlyNums.substring(
      2,
      4
    )}/${onlyNums.substring(4, 8)}`;
  }
};

export const parseDate = date => {
  const [day, month, year] = date.split('/');
  return {
    day,
    month,
    year,
  };
};
