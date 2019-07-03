import debug from 'debug';
import db from '../db/config';

const log = debug('server:queries:recs');

export async function queryRecommendations({ username }) {
  const local = log.extend('queryRecs');
  try {
    const records = await db.run(`
      MATCH (me:User{username: {username}})
      MATCH (me)-[:LIKES]->(a:User)<-[:LIKES]-(b:User)-[:LIKES]->(recUsers:User)
      RETURN DISTINCT recUsers LIMIT 20`,
      { username },
    );

    db.close();

    return records;
  } catch (error) {
    local.extend('error')(error);
    return Promise.reject(new Error(error));
  }
}
