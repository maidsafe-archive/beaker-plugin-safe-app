const safe_app = require('safe-app');
const sendAuthReq = require('./ipc');
var appTokens = require('./app_tokens');

var md_handles = new Array();

module.exports.manifest = {
  newRandomPrivate: 'promise',
  newRandomPublic: 'promise',
  newPrivate: 'promise',
  newPublic: 'promise',
  quickSetup: 'promise',
  encryptKey: 'promise',
  encryptValue: 'promise',
  getNameAndTag: 'promise',
  getVersion: 'promise',
};

/**
* Create a new mutuable data at a random address with private
* access.
* @param {String} appToken - the application token
* @param {Number} typeTag - the typeTag to use
* @returns {Promise<Handle>}
**/
module.exports.newRandomPrivate = (appToken, typeTag) => {
  return appTokens.getApp(appToken)
          .then((app) => app.mutableData.newRandomPrivate(typeTag))
          .then((md) => {
            md_handles[md.ref] = md;
            return md.ref;
          });
}

/**
* Create a new mutuable data at a random address with public
* access.
* @param {String} appToken - the application token
* @param {Number} typeTag - the typeTag to use
* @returns {Promise<Handle>}
**/
module.exports.newRandomPublic = (appToken, typeTag) => {
  return appTokens.getApp(appToken)
          .then((app) => app.mutableData.newRandomPublic(typeTag))
          .then((md) => {
            md_handles[md.ref] = md;
            return md.ref;
          });
}

/**
* Initiate a mutuable data at the given address with private
* access.
* @param {String} appToken - the application token
* @param {Buffer|String}
* @param {Number} typeTag - the typeTag to use
* @returns {Promise<Handle>}
**/
module.exports.newPrivate = (appToken, name, typeTag) => {
  return appTokens.getApp(appToken)
          .then((app) => app.mutableData.newPrivate(name, typeTag))
          .then((md) => {
            md_handles[md.ref] = md;
            return md.ref;
          });
}

/**
* Initiate a mutuable data at the given address with public
* access.
* @param {String} appToken - the application token
* @param {Buffer|String}
* @param {Number} typeTag - the typeTag to use
* @returns {Promise<Handle>}
**/
module.exports.newPublic = (appToken, name, typeTag) => {
  return appTokens.getApp(appToken)
          .then((app) => app.mutableData.newPublic(name, typeTag))
          .then((md) => {
            md_handles[md.ref] = md;
            return md.ref;
          });
}

// MutableData functions
/**
* Quickly set up a newly (not yet created) MutableData with
* the app having full-access permissions (and no other).
*
* @param {String} appToken - the application token
* @param {Handle} mdHandle - the MutableData handle
* @param {Object=} data - a key-value payload it should
*        create the data with
* @returns {Promise<Handle>} - self
**/
module.exports.quickSetup = (appToken, mdHandle, data) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles[mdHandle].quickSetup(data))
          .then((md) => md.ref);
}

/**
* Encrypt the entry key provided as parameter with the encryption key
* contained in a Private MutableData. If the MutableData is Public, the same
* (and unencrypted) value is returned.
*
* @param {String} appToken - the application token
* @param {Handle} mdHandle - the MutableData handle
* @param {(String|Buffer)} key - the key you want to encrypt
* @returns {Promise<Key>} - the encrypted entry key
**/
module.exports.encryptKey = (appToken, mdHandle, key) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles[mdHandle].encryptKey(key));
}

/**
* Encrypt the entry value provided as parameter with the encryption key
* contained in a Private MutableData. If the MutableData is Public, the same
* (and unencrypted) value is returned.
*
* @param {String} appToken - the application token
* @param {Handle} mdHandle - the MutableData handle
* @param {(String|Buffer)} value - the data you want to encrypt
* @returns {Promise<Value>} - the encrypted entry value
**/
module.exports.encryptValue = (appToken, mdHandle, value) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles[mdHandle].encryptValue(value));
}

/**
* Look up the name and tag of the MutableData as required to look it
* up on the network.
*
* @param {String} appToken - the application token
* @param {Handle} mdHandle - the MutableData handle
* @returns {Promise<NameAndTag>}
**/
module.exports.getNameAndTag = (appToken, mdHandle) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles[mdHandle].getNameAndTag());
}

/**
* Look up the mutable data object version on the network
*
* @param {String} appToken - the application token
* @param {Handle} mdHandle - the MutableData handle
* @returns {Promise<Number>} the version
**/
module.exports.getVersion = (appToken, mdHandle) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles[mdHandle].getVersion());
}
