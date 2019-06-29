const { int } = require('neo4j-driver').v1;

module.exports = {
  validateDate(date) {
    return date.year && date.month && date.day;
  },
  formatDate(date = {}) {
    const { day, month, year } = date;
    return {
      day: int(day),
      month: int(month),
      year: int(year),
    };
  },
};
