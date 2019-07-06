import debug from 'debug';
import { postBio, removeImage, postImage } from './bio-model';

const log = debug('server:bio:controller');

export function editBio({ body }, res) {
  const local = log.extend('editBio');
  const err = local.extend('error');
  local('Received request :', body);
  postBio(body, (result, error) => {
    if (error) {
      err('Error!', error);
      res.status(500).send(error);
    }
    local('Completed database query', result);

    res.status(201).json(result);
  });
}

export function deleteImage(req, res) {
  const local = log.extend('deleteImage');
  local('Received request : ', req.body);
  removeImage(req.body.username, () => {
    res.sendStatus(201);
  });
}

export function uploadImage({ body: { username, url } }, res) {
  const local = log.extend('uploadImage');
  local(`Sending image url ${url} for ${username}`);
  postImage(username, url, () => {
    local('Image successfully saved : ', url);
    res.status(201).json(url);
  });
}
