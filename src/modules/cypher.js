import neo4j from 'neo4j-driver';

// converts Neo4j ints to strings
export const neo4jIntsToStrings = (object) => {
  for (const key in object) {
    const value = object[key];
    if (neo4j.isInt(value)) {
      object[key] = value.toString();
    } else if (typeof value === 'object') {
      neo4jIntsToStrings(value);
    }
  }
};
