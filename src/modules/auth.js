export function authenticateUser(token, username) {
  localStorage.setItem('token', token);
  localStorage.setItem('username', username);
}

export function isUserAuthenticated() {
  return localStorage.getItem('token') !== null;
}

export function getUsername() {
  return localStorage.getItem('username');
}

export function deauthenticateUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
}

export function getToken() {
  return localStorage.getItem('token');
}
