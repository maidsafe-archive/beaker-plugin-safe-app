const safe_app = require('safe-app');
const sendAuthReq = require('./ipc');
var appTokens = require('./app_tokens');

module.exports.manifest = {
  create: 'promise',
  fetch: 'promise',
  write: 'promise',
  read: 'promise',
  close: 'promise',
  size: 'promise',
};

module.exports.create = (appToken) => {
  return appTokens.getApp(appToken)
          .then((app) => app.immutableData.create());
}
