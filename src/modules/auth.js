/**
 * Authenticate a user. Save a token string in Local Storage
 *
 * @param {string} token
 */
export function authenticateUser(token) {
  localStorage.setItem('token', token);
}

/**
 * Check if a user is authenticated - check if a token is saved in Local Storage
 *
 * @returns {boolean}
 */
export function isUserAuthenticated() {
  return localStorage.getItem('token') !== null;
}

/**
 * Deauthenticate a user. Remove a token from Local Storage.
 *
 */
export function deauthenticateUser() {
  localStorage.removeItem('token');
}

/**
 * Get a token value.
 *
 * @returns {string}
 */

export function getToken() {
  return localStorage.getItem('token');
}
