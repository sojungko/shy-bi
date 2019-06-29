const neo4j = require('neo4j-driver').v1;
const debug = require('debug');

const log = debug('utils:convert').bind(this);

function intsToNumbers(object) {
  const newObj = {};
  for (const key in object) {
    const value = object[key];
    if (neo4j.isInt(value)) {
      const newVal = value.toNumber();
      newObj[key] = newVal;
    } else if (typeof value === 'object') {
      intsToNumbers(value);
    }
  }
  return newObj;
}

module.exports = {
  intsToNumbers,
};
