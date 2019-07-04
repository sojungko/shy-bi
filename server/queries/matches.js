import debug from 'debug';
import db from '../db/config';
import { intsToNumbers } from '../utils/convert';

const log = debug('server:queries:matches');

export async function queryMatchedUsers({ username }) {
  const local = log.extend('queryMatchedUsers');

  try {
    const { records } = await db.run(
      `
      MATCH (me:User{username: {username}})
      MATCH (me)-[r:LIKES]->(liked:User) WHERE (liked)-[:LIKES]->(me)
      RETURN liked`,
      { username }
    );

    db.close();
    return records.map(record => {
      // don't send back people's passwords!
      local('record', record);
      const {
        properties: { password, ...rest },
      } = record.get('liked');
      return intsToNumbers(rest);
    });
  } catch (error) {
    local.extend('error')(error);
    return Promise.reject(new Error(error));
  }
}

export async function setAllMatchesAsViewed({ username }) {
  const local = log.extend('setMatchAsViewed');
  try {
    await db.run(
      `
      MATCH (user:User {username: {username}})-[r:LIKES]->(liked:User)
      WHERE (liked)-[:LIKES]->(user)
      SET r.viewed = true
      RETURN r`,
      { username }
    );

    db.close();

    return true;
  } catch (error) {
    local.extend('error')(error);
    return Promise.reject(new Error(error));
  }
}

export async function queryNewMatches({ username }) {
  const local = log.extend('queryNewMatches');

  try {
    const { records } = await db.run(
      `
      MATCH (user:User {username: {username}})-[r:LIKES]->(liked:User)
      WHERE (liked)-[:LIKES]->(user) AND (r.viewed = false OR r.viewed IS NULL)
      RETURN liked`,
      { username }
    );

    db.close();

    return records.map(record => {
      // don't send back people's passwords!
      local('record', record);
      const {
        properties: { password, ...rest },
      } = record.get('liked');
      return intsToNumbers(rest);
    });
  } catch (error) {
    local.extend('error')(error);
    return Promise.reject(new Error(error));
  }
}
