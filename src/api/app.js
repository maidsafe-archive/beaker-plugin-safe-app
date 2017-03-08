const safe_app = require('safe-app');
const ipc = require('./ipc');
var appTokens = require('./app_tokens');

module.exports.manifest = {
  connect: 'promise',
  authorise: 'promise',
  webFetch: 'promise',
};

module.exports.connect = (appInfo) => {
  return safe_app.initializeApp(appInfo)
    .then((app) => app.auth.connectUnregistered())
    .then((app) => {
      return appTokens.addApp(app);
    });
}

module.exports.webFetch = (appToken, url) => {
  return appTokens.getApp(appToken)
          .then((app) => app.webFetch(url)
            .then((f) => app.immutableData.fetch(f.dataMapName))
            .then((i) => i.read())
          );
}

module.exports.authorise = (appInfo, permissions, ownContainer) => {
  return safe_app.initializeApp(appInfo)
          .then((app) => app.auth.genAuthUri(permissions, ownContainer)
            .then((authReq) => ipc.sendAuthReq(authReq)
              .then((authResp) => app.auth.loginFromURI(authResp)
                .then(() => {
                  console.log("Auth response: ", authResp);
                  return appTokens.addApp(app);
                }))));
}
