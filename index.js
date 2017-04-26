/* eslint-disable import/no-unresolved */
const safeProtocol = require('./dist/protocol');
const api = require('./dist/api');
/* eslint-disable import/no-unresolved */

module.exports = {
  configure() {
  },
  homePages: [{
    label: 'SAFE App',
    href: 'https://safenetforum.org/t/safe-network-alpha-release/10687/1'
  }],
  protocols: [safeProtocol],
  webAPIs: api
};
