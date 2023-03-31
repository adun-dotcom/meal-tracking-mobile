import { shuffleToken } from './authorization';

const setCookie = (name, value, days = 2) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie =
    name + '=' + (shuffleToken(value) || '') + expires + '; path=/';
};
const getCookie = (name = process.env.REACT_APP_TOKEN_KEY, shuffle = false) => {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      const cookie = c.substring(nameEQ.length, c.length);
      return shuffle ? shuffleToken(cookie) : cookie;
    }
  }
  return null;
};
const eraseCookie = (name = process.env.REACT_APP_TOKEN_KEY) => {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

const useAuthToken = () => {
  return [getCookie(), setCookie, eraseCookie, getCookie];
};
export { useAuthToken };
