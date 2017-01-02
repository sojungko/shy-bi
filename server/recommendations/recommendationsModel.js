/* ------------* server/recommendations/recommendationsModel.js *-----------
* methods:
*
*  1) GET ALL RECOMMENDED MATCHES: 
*
*
*/

const db = require('../database/config');


module.exports = {
    /* ------------------------- * GET RECOMMENDED MATCHES * ------------
   *
   * Takes the name of the currently logged in user and fetches
   * all recommended matches from the database.  'Recommended' matches
   * are generated by querying the DB for potential matches and returning
   * users who were liked by a friend separated by 1 degree.
   *
   *  Parameters:
   *    • username | String |
   *    • callback | Function | Exectued on the result of db query.
   *
   *  Returns:
   *    • the resulting db query which resolves into a promise that
   *        executes the callback.
   *
   * --------------------------------------------------------------- */
}
