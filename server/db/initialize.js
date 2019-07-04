/* ------------------- * DATABASE/INITIALIZE.JS * -----------------
 *
 * This file intialize Neo4J Database.
 *
 * --------------------------------------------------------------- */

import debug from 'debug';
import db from '../db/config';

/* ------------------------- * INITIALIZE * -------------------------
 * This method creates constraints for the Neo4J Database.
 * The constraints are:
 *
 * User
 *  • Username must be unique
 *
 * --------------------------------------------------------------- */
const log = debug('server:db:initialize');

export default function initialize() {
  log('Initializing Database');
  log('Creating constraints');
  return db.run(
    `CREATE CONSTRAINT ON (users:User)
      ASSERT users.username IS UNIQUE
    CREATE CONSTRAINT ON (users:User)
      ASSERT users.email IS UNIQUE`
  );
}
