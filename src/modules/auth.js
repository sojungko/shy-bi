/**
 * Authenticate a user. Save a token string in Local Storage
 *
 * @param {string} token
 */
export function authenticateUser(token, username) {
  localStorage.setItem('token', token);
  localStorage.setItem('username', username);
}

/**
 * Check if a user is authenticated - check if a token is saved in Local Storage
 *
 * @returns {boolean}
 */
export function isUserAuthenticated() {
  return localStorage.getItem('token') !== null;
}

export function getUsername() {
  return localStorage.getItem('username');
}

/**
 * Deauthenticate a user. Remove a token from Local Storage.
 *
 */
export function deauthenticateUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
}

/**
 * Get a token value.
 *
 * @returns {string}
 */

export function getToken() {
  return localStorage.getItem('token');
}
