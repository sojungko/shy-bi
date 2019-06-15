/* ------------------- * DATABASE/INITIALIZE.JS * -----------------
 *
 * This file intialize Neo4J Database.
 *
 * --------------------------------------------------------------- */


const db = require('../database/config');


/* ------------------------- * INITIALIZE * -------------------------
 * This method creates constraints for the Neo4J Database.
 * The constraints are:
 *
 * User
 *  • Username must be unique
 *
 * --------------------------------------------------------------- */
const debug = require('debug');
const log = debug('server:db:initialize').bind(this);

const initialize = () => {
  log('Initializing Database');
  log('Creating constraints');
  return db.run(
    `CREATE CONSTRAINT ON (users:User)
      ASSERT users.username IS UNIQUE
    CREATE CONSTRAINT ON (users:User)
      ASSERT users.email IS UNIQUE`,
  );
};

module.exports = initialize;
