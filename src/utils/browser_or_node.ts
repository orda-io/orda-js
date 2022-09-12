import { ordaLogger } from "@orda/constants/constants";

export { isBrowser };

const checkBrowser = new Function('try {return this===window;}catch(e){ return false;}');
const isBrowser = checkBrowser();

if (!isBrowser) {
  global.fetch = require('cross-fetch');
  ordaLogger.debug("initialize orda-js sdk in nodejs")
} else {
  ordaLogger.debug("initialize orda-js sdk in browser")
}