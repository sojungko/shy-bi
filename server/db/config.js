import neo4j from 'neo4j-driver';

const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env;

const driver = neo4j.driver(
  NEO4J_URI,
  neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD)
);
const session = driver.session();

export default session;
