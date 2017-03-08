const safe_app = require('safe-app');
const sendAuthReq = require('./ipc');
var appTokens = require('./app_tokens');

module.exports.manifest = {
  newRandomPublic: 'promise',
  getNameAndTag: 'promise',
  getVersion: 'promise',
};

module.exports.newRandomPublic = (appToken, typeTag) => {
  return appTokens.getApp(appToken)
          .then((app) => app.mutableData.newRandomPublic(typeTag))
          .then((mdHandle) => mdHandle.quickSetup({})
            .then(() => mdHandle)
          );
}

module.exports.getNameAndTag = (appToken, mdHandle) => {
  return appTokens.getApp(appToken)
          .then((app) => mdHandle.getNameAndTag());
}

module.exports.getVersion = (appToken, mdHandle) => {
  return appTokens.getApp(appToken)
          .then((app) => mdHandle.getVersion());
}
