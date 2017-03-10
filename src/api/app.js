const safe_app = require('safe-app');
const ipc = require('./ipc');
const addMutableData = require('./mutable_data').addMutableData;
var appTokens = require('./app_tokens');

module.exports.manifest = {
  connect: 'promise',
  authorise: 'promise',
  webFetch: 'promise',
  isRegistered: 'promise',
  canAccessContainer: 'promise',
  getContainer: 'promise',
  getPubSignKey: 'promise',
  getEncKey: 'promise',
  getSignKeyFromRaw: 'promise',
  getEncKeyKeyFromRaw: 'promise',
};

/**
* Create a new, unregistered Session (read-only)
* @returns {Promise<SAFEAppToken>} new instace
*/
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

// With the options object it can be opt for getting a container
// for the app itself: opts.own_container=true
module.exports.authorise = (appInfo, permissions, options) => {
  return safe_app.initializeApp(appInfo)
          .then((app) => app.auth.genAuthUri(permissions, options)
            .then((authReq) => ipc.sendAuthReq(authReq))
//              .then((authResp) => app.auth.loginFromURI(authResp)
//               refreshContainerAccess
                .then((authResp) => {
                  console.log("Auth response: ", authResp);
                  return appTokens.addApp(app);
                }));
}

/**
* Whether or not this is a registered/authenticated
* session.
*
* @param {String} appToken - the application token
* @returns {Boolean} true if this is an authenticated session
**/
module.exports.isRegistered = (appToken) => {
  return appTokens.getApp(appToken).
          then((app) => app.auth.registered);
}

/**
* Whether or not this session has specifc permission access of a given
* container.
* @param {String} appToken - the application token
* @arg {String} name  name of the container, e.g. `_public`
* @arg {(String||Array<String>)} [permissions=['Read']] permissions to check for
* @returns {Promise<Boolean>}
**/
module.exports.canAccessContainer = (appToken, name, permissions) => {
  return appTokens.getApp(appToken).
          then((app) => app.auth.canAccessContainer(name, permissions));
}

/**
* Lookup and return the information necessary to access a container.
* @param {String} appToken - the application token
* @arg name {String} name of the container, e.g. `'_public'`
* @returns {Promise<Handle>} the handle for the Mutable Data behind that object
*/
module.exports.getContainer = (appToken, name) => {
  return appTokens.getApp(appToken)
          .then((app) => app.auth.getAccessContainerInfo(name))
          .then(addMutableData);
}

/**
* Get the public signing key of this session
* @param {String} appToken - the application token
* @returns {Promise<SignKey>}
**/
module.exports.getPubSignKey = (appToken) => {
  return appTokens.getApp(appToken).
          then((app) => app.auth.getPubSignKey());
}

/**
* Get the public encryption key of this session
* @param {String} appToken - the application token
* @returns {Promise<EncKey>}
**/
module.exports.getEncKey = (appToken) => {
  return appTokens.getApp(appToken).
          then((app) => app.auth.getEncKey());
}

/**
* Interprete the SignKey from a given raw string
* @param {String} appToken - the application token
* @param {String} raw
* @returns {Promise<SignKey>}
**/
module.exports.getSignKeyFromRaw = (appToken, raw) => {
  return appTokens.getApp(appToken).
          then((app) => app.auth.getSignKeyFromRaw(raw));
}

/**
* Interprete the encryption Key from a given raw string
* @param {String} appToken - the application token
* @arg {String} raw
* @returns {Promise<EncKey>}
**/
module.exports.getEncKeyKeyFromRaw = (appToken, raw) => {
  return appTokens.getApp(appToken).
          then((app) => app.auth.getEncKeyKeyFromRaw(raw));
}
