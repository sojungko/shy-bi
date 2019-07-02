import debug from 'debug';
import db from '../db/config';
import { intsToNumbers } from '../utils/convert';

const log = debug('server:queries:likes');

export async function mergeLikedUser({ username, likedUser }) {
  const local = log.extend('mergeLikedUser');
  try {
    const { records } = await db.run(`
      MATCH (user:User{username: {username}})
      MATCH (liked:User{username: {likedUser}})
      MERGE (user)-[r:LIKES]->(liked)
      RETURN CASE WHEN (liked)-[:LIKES]->(user) THEN true
      ELSE false END AS isMatch
    `, { username, likedUser });

    db.close();
    local('records[0].isMatch', records[0].get('isMatch'));

    return records[0].get('isMatch');
  } catch (error) {
    local.extend('error')(error);
    return Promise.reject(new Error(error));
  }
}

export async function deleteLike({ username, unlikedUser }) {
  const local = log.extend('deleteLike');
  try {
    const { records } = await db.run(`
      MATCH (user:User{username: {username}})
      MATCH (unliked:User{username: {unlikedUser}})
      MATCH (user)-[likes:LIKES]->(unliked)
      DELETE likes
    `);

    local('records', records);

    return records;
  } catch (error) {
    log.extend('error')(error);
    return Promise.reject(new Error(error));
  }
}
