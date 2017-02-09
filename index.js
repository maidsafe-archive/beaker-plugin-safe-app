const safeProtocol = require('./src/protocol');
const api = require('./src/api');

module.exports = {
  configure() {
  },
  homePages: [{
    label: 'SAFE Network',
    href: 'https://safenetforum.org/t/safe-network-alpha-release/10687/1'
  }],
  protocols: [safeProtocol],
  webAPIs: api
};
