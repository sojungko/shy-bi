import neo4j from 'neo4j-driver';

export function validateDate(date) {
  return date.year && date.month && date.day;
}

export function formatDate(date = {}) {
  const { day, month, year } = date;
  return {
    day: neo4j.int(day),
    month: neo4j.int(month),
    year: neo4j.int(year),
  };
}
