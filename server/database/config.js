const neo4j = require('neo4j-driver').v1;
const pw = process.env.key || require('./pw.js');

const driver = neo4j.driver(
  'bolt://hobby-jdjicmbeoeaggbkeckfkllol.dbs.graphenedb.com:24786',
  neo4j.auth.basic('datastructureducks', pw)
);
const session = driver.session();

module.exports = session;
