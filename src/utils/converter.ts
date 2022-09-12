import { isBrowser } from "@orda/utils/browser_or_node";

const unescape = typeof window != 'undefined' ? window.unescape : decodeURI;
const escape = typeof window != 'undefined' ? window.escape : encodeURI

export function commonBtoA(base64: string): string {
  return isBrowser ? decodeURIComponent(escape(window.atob(base64))) : Buffer.from(base64, 'base64').toString('utf-8');
}

export function commonAtoB(asc: string): string {
  return isBrowser ? window.btoa(unescape(encodeURIComponent(asc))) : Buffer.from(asc, 'utf-8').toString('base64');
}
