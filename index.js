const safeProtocol = require('./src/protocol');
const api = require('./src/api');

module.exports = {
  configure() {
  },
  homePages: [{
    label: 'SAFE App',
    href: 'https://safenetforum.org/t/safe-network-alpha-release/10687/1'
  }],
  protocols: [safeProtocol],
  webAPIs: [
    {
        name: 'testAPI',
        isInternal: true,
        manifest: api.manifest,
        methods: api.test
    }
  ]
};
