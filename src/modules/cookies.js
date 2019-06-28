import ExEnv from 'exenv';
/* \
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  Revision #3 - July 13th, 2017
|*|
|*|  https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
|*|  https://developer.mozilla.org/User:fusionchess
|*|  https://github.com/madmurphy/cookies.js
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path[, domain]])
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\*/

const docCookies = {
  getItem(sKey) {
    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
  },
  setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    let sExpires = '';
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd;
          /*
          Note: Despite officially defined in RFC 6265, the use of `max-age` is not compatible with any
          version of Internet Explorer, Edge and some mobile browsers. Therefore passing a number to
          the end parameter might not work as expected. A possible solution might be to convert the the
          relative time to an absolute time. For instance, replacing the previous line with:
          */
          /*
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; expires=" + (new Date(vEnd * 1e3 + Date.now())).toUTCString();
          */
          break;
        case String:
          sExpires = '; expires=' + vEnd;
          break;
        case Date:
          sExpires = '; expires=' + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = `${encodeURIComponent(sKey)}=${encodeURIComponent(sValue)}${sExpires}${sDomain ? "; domain=" + sDomain : ""}${sPath ? "; path=" + sPath : ""}${bSecure ? "; secure" : ""}`;
    return true;
  },
  removeItem(sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) { return false; }
    document.cookie = `${encodeURIComponent(sKey)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT${sDomain ? "; domain=" + sDomain : ""}${sPath ? "; path=" + sPath : ""}`;
    return true;
  },
  hasItem(sKey) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
  },
  keys() {
    const aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);
    for (let nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  },
};

export function getCookie(key) {
  if (ExEnv.canUseDOM) {
    return docCookies.getItem(key);
  }
  return false;
}

export function setCookie(key, value, expiration = false) {
  if (ExEnv.canUseDOM) {
    return docCookies.setItem(key, value, expiration, '/');
  }
  return false;
}

export function clearCookie(key) {
  if (ExEnv.canUseDOM) {
    return docCookies.removeItem(key, '/');
  }
  return false;
}

export function updateUserCookie(newUserData = {}) {
  const oneYearFromNow = new Date(new Date().setYear(new Date().getFullYear() + 1));

  // resave cookie, merging fetched profile with exiting one
  const user = JSON.parse(getCookie('user'));
  const mergedUser = { ...user, ...newUserData };

  setCookie('user', JSON.stringify(mergedUser), oneYearFromNow);
}

export function userFromCookie({ user } = {}) {
  const userEncoded = user || getCookie('user');
  let userObj = null;

  try {
    userObj = JSON.parse(userEncoded);
  } catch (err) {
    // console.log('err', err)
  }
  return userObj || null;
}

export default docCookies;
