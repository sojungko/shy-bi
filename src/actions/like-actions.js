import axios from 'axios';
import * as A from 'constants/action-types';

/* Fetch Liked Users */
export function getLikedUsers(username) {
  return dispatch => axios.get(`/api/search/liked/${username}`)
    .then(({ data }) => dispatch({ type: A.GET_LIKED_USERS, payload: data }))
    .catch(error => console.error(error));
}

export function likeUser(username, likedUser) {
  return dispatch => axios.post('/api/users/like', { username, likedUser })
    .then(({ data }) => {
      if (data.isMatch) {
        return dispatch({ type: A.IS_MATCH, payload: data.liked });
      }
      return dispatch({ type: A.IS_NOT_MATCH, payload: data.liked });
    });
}

export function unlikeUser(username, unlikedUser) {
  return dispatch => axios.post('/api/users/unlike', { username, unlikedUser })
    .then((res) => {
      return dispatch({ type: A.UNLIKE_USER });
    })
    .catch((error) => {
      console.log('ACTIONS/UNLIKE_USER did not alter user data! ', error);
    });
}