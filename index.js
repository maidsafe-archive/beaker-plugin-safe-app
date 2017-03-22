const safeProtocol = require('./dist/protocol');
const api = require('./dist/api');

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
