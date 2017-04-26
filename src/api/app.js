const safeApp = require('safe-app');
const ipc = require('./ipc');
const { genHandle, getObj } = require('./helpers');

module.exports.manifest = {
  initialise: 'promise',
  connect: 'promise',
  authorise: 'promise',
  connectAuthorised: 'promise',
  webFetch: 'promise',
  isRegistered: 'promise',
  canAccessContainer: 'promise',
  getContainer: 'promise',
  getPubSignKey: 'promise',
  getEncKey: 'promise',
  getSignKeyFromRaw: 'promise',
  getEncKeyKeyFromRaw: 'promise',
  refreshContainerAccess: 'promise',
};

/**
 * Create a new SAFEApp instance without a connection to the network
 * @returns {Promise<SAFEAppToken>} new instace
 */
module.exports.initialise = (appInfo) => {
  if (this && this.sender) {
    const wholeUrl = this.sender.getURL();
    appInfo.scope = wholeUrl;
  } else {
    appInfo.scope = null;
  }

  return safeApp.initializeApp(appInfo)
    .then(genHandle);
};

/**
 * Create a new, unregistered Session (read-only)
 * @returns {Promise<SAFEAppToken>} same instace
 */
module.exports.connect = (appToken) => {
  return getObj(appToken)
    .then((app) => app.auth.connectUnregistered())
    .then(() => appToken);
};

/**
 * With the options object it can be opt for getting a container
 * for the app itself: opts.own_container=true
 * @returns {Promise<AuthURI>} auth granted URI
 */
module.exports.authorise = (appToken, permissions, options) => {
  return new Promise((resolve, reject) => {
    getObj(appToken)
      .then((app) => app.auth.genAuthUri(permissions, options)
        .then((authReq) => ipc.sendAuthReq(authReq, (err, res) => {
          if (err) {
            return reject(new Error('Unable to authorise the application: ', err)); // TODO send Error in specific
          }
          return resolve(res);
        })))
      .catch(reject);
  });
};

/**
 * Create a new, registered Session (read-write)
 * @returns {Promise<SAFEAppToken>} same instace
 */
module.exports.connectAuthorised = (appToken, authUri) => {
  return getObj(appToken)
    .then((app) => app.auth.loginFromURI(authUri))
    .then(() => appToken);
};

/**
 * Authorise container request
 * @returns {Promise<AuthURI>} auth granted URI
 */
module.exports.authoriseContainer = (appToken, permissions) => {
  return new Promise((resolve, reject) => {
    getObj(appToken)
      .then((app) => app.auth.genContainerAuthUri(permissions)
        .then((authReq) => ipc.sendAuthReq(authReq, (err, res) => {
          if (err) {
            return reject(new Error('Unable to authorise the application: ', err)); // TODO send Error in specific
          }
          return resolve(res);
        })))
      .catch(reject);
  });
};

module.exports.webFetch = (appToken, url) => {
  return getObj(appToken)
    .then((app) => app.webFetch(url)
      .then((f) => app.immutableData.fetch(f.dataMapName))
      .then((i) => i.read())
    );
};

/**
 * Whether or not this is a registered/authenticated
 * session.
 *
 * @param {String} appToken - the application token
 * @returns {Boolean} true if this is an authenticated session
 **/
module.exports.isRegistered = (appToken) => {
  return getObj(appToken)
    .then((app) => app.auth.registered);
};

/**
 * Whether or not this session has specifc permission access of a given
 * container.
 * @param {String} appToken - the application token
 * @arg {String} name  name of the container, e.g. `_public`
 * @arg {(String||Array<String>)} [permissions=['Read']] permissions to check for
 * @returns {Promise<Boolean>}
 **/
module.exports.canAccessContainer = (appToken, name, permissions) => {
  return getObj(appToken)
    .then((app) => app.auth.canAccessContainer(name, permissions));
};

/**
 * Refresh accessible containers
 * @param appToken
 */
module.exports.refreshContainerAccess = (appToken) => {
  return getObj(appToken)
    .then((app) => app.auth.refreshContainerAccess());
};

/**
 * Lookup and return the information necessary to access a container.
 * @param {String} appToken - the application token
 * @arg name {String} name of the container, e.g. `'_public'`
 * @returns {Promise<MutableDataHandle>} the handle for the Mutable Data behind that object
 */
module.exports.getContainer = (appToken, name) => {
  return getObj(appToken)
    .then((app) => app.auth.getAccessContainerInfo(name))
    .then(genHandle);
};

/**
 * Get the public signing key of this session
 * @param {String} appToken - the application token
 * @returns {Promise<SignKeyHandle>}
 **/
module.exports.getPubSignKey = (appToken) => {
  return getObj(appToken)
    .then((app) => app.auth.getPubSignKey())
    .then(genHandle);
};

/**
 * Get the public encryption key of this session
 * @param {String} appToken - the application token
 * @returns {Promise<EncKeyHandle>}
 **/
module.exports.getEncKey = (appToken) => {
  return getObj(appToken)
    .then((app) => app.auth.getEncKey())
    .then(genHandle);
};

/**
 * Interprete the SignKey from a given raw string
 * @param {String} appToken - the application token
 * @param {String} raw
 * @returns {Promise<SignKeyHandle>}
 **/
module.exports.getSignKeyFromRaw = (appToken, raw) => {
  return getObj(appToken)
    .then((app) => app.auth.getSignKeyFromRaw(raw))
    .then(genHandle);
};

/**
 * Interprete the encryption Key from a given raw string
 * @param {String} appToken - the application token
 * @arg {String} raw
 * @returns {Promise<EncKeyHandle>}
 **/
module.exports.getEncKeyKeyFromRaw = (appToken, raw) => {
  return getObj(appToken)
    .then((app) => app.auth.getEncKeyKeyFromRaw(raw))
    .then(genHandle);
};
