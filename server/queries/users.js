import debug from 'debug';
import db from '../db/config';
import { intsToNumbers } from '../utils/convert';

const log = debug('server:queries:users');

export async function queryUser({ username }) {
  const local = log.extend('queryUser');
  try {
    const { records } = await db.run(`
      MATCH (user:User{username: {username}})
      RETURN user LIMIT 1
      `,
      { username },
    );

    db.close();
    local('user records', records);

    if (records.length) {
      const [firstMatch] = records; // take first match
      const { properties = {} } = firstMatch.get('user');

      return intsToNumbers(properties);
    }
    // TODO what if theres no match?
  } catch (error) {
    local.extend('error')('error', error);
    return Promise.reject(new Error(error));
  }
}

export async function queryLikedUsers({ username }) {
  const local = log.extend('queryLikedUsers');
  try {
    const { records } = await db.run(`
      MATCH (user:User{username: {username}})
      OPTIONAL MATCH (user)-[:LIKES]->(liked:User)
      RETURN liked.username`,
      { username },
    );

    db.close();
    local('liked user records', records);

    return records.map(record => record.get('liked.username'));
  } catch (error) {
    local.extend('error')('error', error);
    return Promise.reject(new Error(error));
  }
}

export async function queryBirthday({ username }) {
  const local = log.extend('queryBirthday');
  try {
    const { records } = await db.run(`
      MATCH (user:User{username: {username}})
      UNWIND [duration.inMonths(user.birthday, date())] as age
      RETURN age.months`,
      { username },
    );

    local('records', records);
    db.close();

    const [firstMatch] = records;

    return firstMatch && firstMatch.get('age.months');
  } catch (error) {
    local.extend('error')('error', error);
    return Promise.reject(new Error(error));
  }
}

