import debug from 'debug';
import db from '../db/config';
import { intsToNumbers } from '../utils/convert';

let log = debug('server:queries:users');

export async function queryUser({ username }) {
  log = log.extend('queryUser');
  try {
    const { records } = await db.run(`
      MATCH (user:User{username: {username}})
      RETURN user LIMIT 1
      `,
      { username },
    );

    db.close();
    console.log('user records', records);

    if (records.length) {
      const [firstMatch] = records; // take first match
      const { properties = {} } = firstMatch.get('user');

      return intsToNumbers(properties);
    }
    // TODO what if theres no match?
  } catch (error) {
    log('error', error);
    return Promise.reject(new Error(error));
  }
}

export async function queryLikedUsers({ username }) {
  log = log.extend('queryLikedUsers');
  try {
    const { records } = await db.run(`
      MATCH (user:User{username: {username}})
      OPTIONAL MATCH (user)-[:LIKES]->(liked:User)
      RETURN liked.username`,
      { username },
    );

    db.close();
    console.log('liked user records', records);

    return records.map(record => record.get('liked.username'));
  } catch (error) {
    log('error', error);
    return Promise.reject(new Error(error));
  }
}

export async function queryBirthday({ username }) {
  log = log.extend('queryBirthday');
  try {
    const { records } = await db.run(`
      MATCH (user:User{username: {username}})
      UNWIND [duration.inMonths(user.birthday, date())] as age
      RETURN age.months`,
      { username },
    );

    log('records', records);
    db.close();

    const [firstMatch] = records;

    return firstMatch && firstMatch.get('age.months');
  } catch (error) {
    console.log('error', error);
    return Promise.reject(new Error(error));
  }
}

