import debug from 'debug';
import db from '../db/config';
import { formatDate, validateDate } from '../utils/validate';
import { intsToNumbers } from '../utils/convert';

const log = debug('server:queries:users');

export async function mergeUser({ username, email, hash }) {
  const local = log.extend('mergeUser');
  try {
    const { records } = await db.run(
      `MERGE (newUser:User {
        username: {username},
        password: {hash},
        email: {email}
      })
      ON CREATE SET newUser.memberSince = datetime()
  
      RETURN newUser`,
      { username, email, hash }
    );

    db.close();

    // No need to return age because no birthday input at signup
    const {
      properties: { password, ...rest },
    } = records.get('newUser');
    return intsToNumbers(rest);
  } catch (error) {
    local.extend('error')(error);
    return Promise.reject(new Error(error));
  }
}

export async function queryAllUsers() {
  const local = log.extend('queryAllUsers');
  try {
    const { records } = await db.run(`
      MATCH (user:User)
      UNWIND [duration.inMonths(user.birthday, date())] as age
      RETURN user, age LIMIT 10`);

    db.close();

    return records.map(record => {
      // don't send back people's passwords!
      local('record', record);
      const {
        properties: { password, ...rest },
      } = record.get('user');
      const age = Math.floor(record.get('age').months / 12);
      return intsToNumbers({ age, ...rest });
    });
  } catch (error) {
    local.extend('error')(error);
    return Promise.reject(new Error(error));
  }
}

export async function queryFilteredUsers(filters = {}) {
  const local = log.extend('queryFilteredUsers');
  const { minage = 19, maxage = 100, sex } = filters;
  const sexes = sex.split(',');
  try {
    const { records } = await db.run(
      `
      MATCH (user:User)
      WITH user
      UNWIND [duration.inMonths(user.birthday, date())] as age
      WITH user, age
      WHERE toInt({minage}) <= floor(age.months/12) <= toInt({maxage})
      ${sexes.length > 1 ? 'WITH * WHERE user.sex in {sexes}' : ''}
      RETURN user, age
      LIMIT 10`,
      { minage, maxage, sexes }
    );

    db.close();

    return records.map(record => {
      const {
        properties: { password, ...rest },
      } = record.get('user');
      const age = record.get('age');
      return intsToNumbers({ ...rest, age });
    });
  } catch (error) {
    local.extend('error')(error);
    return Promise.reject(new Error(error));
  }
}

export async function queryUser({ username }) {
  const local = log.extend('queryUser');
  try {
    const { records } = await db.run(
      `
      MATCH (user:User{username: {username}})
      RETURN user LIMIT 1
      `,
      { username }
    );

    db.close();

    local('user records', records);

    if (records.length) {
      // TODO remove password, add age in response
      const [firstMatch] = records; // take first match
      const {
        properties: { password, ...rest },
      } = firstMatch.get('user');

      return intsToNumbers(rest);
    }
  } catch (error) {
    // TODO what if theres no match?
    local.extend('error')(error);
    return Promise.reject(new Error(error));
  }
}

export async function queryBirthday({ username }) {
  const local = log.extend('queryBirthday');
  try {
    const { records } = await db.run(
      `
      MATCH (user:User{username: {username}})
      UNWIND [duration.inMonths(user.birthday, date())] as age
      RETURN age.months`,
      { username }
    );

    db.close();

    local('records', records);

    const [firstMatch] = records;

    return firstMatch && firstMatch.get('age.months');
  } catch (error) {
    local.extend('error')(error);
    return Promise.reject(new Error(error));
  }
}

export async function setUserProperties(props) {
  const local = log.extend('setUserProperties');
  try {
    const { records } = await db.run(
      `MATCH (user:User {username: {username}})
        SET
        user.name = {name},
        user.email = {email},
        ${
          validateDate(props.birthday)
            ? 'user.birthday = date({birthday}),'
            : ''
        }
        user.edLevel = {edLevel},
        user.aboutMe = {aboutMe},
        user.sex = {sex}
        WITH user
        UNWIND [duration.inMonths(user.birthday, date())] as age
        RETURN user, age
        `,
      {
        ...props,
        birthday: formatDate(props.birthday),
      }
    );

    db.close();

    const {
      properties: { password, ...rest },
    } = records.get('user');
    const age = Math.floor(records.get('age').months / 12);
    return intsToNumbers({ age, ...rest });
  } catch (error) {
    local.extend('error')(error);
    return Promise.reject(new Error(error));
  }
}

export async function deleteImage(username) {
  const local = log.extend('deleteImage');
  try {
    const { records } = await db.run(
      `MATCH (user:User {username: {username}})
      REMOVE user.image_url
      RETURN user`,
      { username }
    );

    db.close();

    local('Successfully removed image from database');

    const {
      properties: { password, ...rest },
    } = records.get('user');
    const age = Math.floor(records.get('age').months / 12);
    return intsToNumbers({ age, ...rest });
  } catch (error) {
    log.extend('error')(error);
    return Promise.reject(new Error(error));
  }
}

export async function setImage({ username, url }) {
  const local = log.extend('setImage');
  try {
    const { records } = await db.run(
      `MATCH (user:User{ username: {username} })
    SET user.image_url = {url}
    RETURN user`,
      { username, url }
    );

    db.close();

    const {
      properties: { password, ...rest },
    } = records.get('user');
    const age = Math.floor(records.get('age').months / 12);
    return intsToNumbers({ age, ...rest });
  } catch (error) {
    local.extend('error')(error);
    return Promise.reject(new Error(error));
  }
}
