const neo4j = require('neo4j-driver').v1;
const debug = require('debug');

const log = debug('utils:convert')

function intsToNumbers(object) {
  const newObj = {};
  for (const key in object) {
    const value = object[key];
    if (neo4j.isInt(value)) {
      const newVal = value.toNumber();
      newObj[key] = newVal;
    }
  }
  return newObj;
}

module.exports = {
  intsToNumbers,
};
