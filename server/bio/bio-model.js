import debug from 'debug';

import { setUserProperties, deleteImage, setImage } from '../queries/users';

const log = debug('server:bio:model');

export async function postBio(user, callback) {
  const local = log.extend('postBio');
  local(`Accessing user database with username: ${user.username}`);
  local('birthday', user.birthday);

  try {
    const editedUser = await setUserProperties(user);
    return callback(editedUser);
  } catch (error) {
    local.extend('error')(error);
    throw error;
  }
}

export async function removeImage(username, callback) {
  const local = log.extend('removeImage');
  local(`Accessing user database with ${username}`);
  try {
    const editedUser = await deleteImage(username);
    return callback(editedUser);
  } catch (error) {
    local.extend('error')(error);
    throw error;
  }
}

export async function postImage(username, url, callback) {
  const local = log.extend('postImage');
  local(`Accessing user database with url: ${url}`);
  try {
    const editedUser = await setImage({ username, url });
    return callback(editedUser);
  } catch (error) {
    local.extend('error')(error);
    throw error;
  }
}
