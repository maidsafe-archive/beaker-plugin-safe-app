const safe_app = require('safe-app');

module.exports.manifest = {
  initializeApp: 'promise',
  fromAuthURI: 'promise'
};

module.exports.initializeApp = (appInfo) => safe_app.initializeApp(appInfo);
module.exports.fromAuthURI = (appInfo, authUri) => safe_app.fromAuthURI(appInfo, authUri);
