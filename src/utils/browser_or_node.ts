export { isBrowser };

const checkBrowser = new Function(
  'try {return this===window;}catch(e){ return false;}'
);
const isBrowser = checkBrowser();

if (!isBrowser) {
  global.fetch = require('node-fetch');
}
