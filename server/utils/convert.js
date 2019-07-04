import neo4j from 'neo4j-driver';
import debug from 'debug';

const log = debug('utils:convert');

export function intsToNumbers(object) {
  const newObj = {};

  for (const key in object) {
    const value = object[key];
    if (neo4j.isInt(value)) {
      const newVal = value.toNumber();
      newObj[key] = newVal;
    } else if (typeof value === 'object') {
      newObj[key] = intsToNumbers(value);
    } else {
      newObj[key] = value;
    }
  }
  return newObj;
}
