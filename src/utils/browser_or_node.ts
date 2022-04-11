export { isBrowser };

const checkBrowser = new Function('try {return this===window;}catch(e){ return false;}');
const isBrowser = checkBrowser();

if (!isBrowser) {
  global.fetch = require('cross-fetch');
  global.WebSocket = require('ws');
}

export function commonBtoA(base64: string): string {
  return isBrowser ? decodeURIComponent(escape(window.atob(base64))) : Buffer.from(base64, 'base64').toString('ascii');
}

export function commonAtoB(asc: string): string {
  return isBrowser ? window.btoa(unescape(encodeURIComponent(asc))) : Buffer.from(asc, 'utf-8').toString('base64');
}
