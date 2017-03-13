const safe_app = require('safe-app');
const addEntriesObj = require('./mutable_data_entries').addEntriesObj;
const addKeysObj = require('./mutable_data_keys').addKeysObj;
const addValuesObj = require('./mutable_data_values').addValuesObj;
var appTokens = require('./app_tokens');

var md_handles = new Array();

const addMutableData = (md) => {
  md_handles[md.ref] = md;
  return md.ref;
}

module.exports.addMutableData = addMutableData;

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
  get: 'promise',
  put: 'promise',
  getEntries: 'promise',
  getKeys: 'promise',
  getValues: 'promise',
  getPermissions: 'promise',
  getUserPermissions: 'promise',
  delUserPermissions: 'promise',
  setUserPermissions: 'promise',
  applyEntriesMutation: 'promise',
  serialise: 'promise',
  emulateAs: 'promise',
  pepe: 'promise',
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
          .then((md) => addMutableData(md));
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
          .then((md) => addMutableData(md));
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
          .then((md) => addMutableData(md));
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
          .then((md) => addMutableData(md));
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
          .then((md) => mdHandle);
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

/**
* Look up the value of a specific key
*
* @param {String} appToken - the application token
* @param {Handle} mdHandle - the MutableData handle
* @param {String} key - the entry's key
* @returns {Promise<ValueVersion>} - the value at the current version
**/
module.exports.get = (appToken, mdHandle, key) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles[mdHandle].get(key));
}

/**
* Create this MutableData on the network.
* @param {String} appToken - the application token
* @param {Handle} mdHandle - the MutableData handle
* @param {Permission} permissions - the permissions to create the mdata with
* @param {Entries} entries - data payload to create the mdata with
* @returns {Promise<()>}
**/
module.exports.put = (appToken, mdHandle, permissions, entries) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles[mdHandle].put(permissions, entries));
}

/**
* Get a Handle to the entries associated with this mdata
* @param {String} appToken - the application token
* @param {Handle} mdHandle - the MutableData handle
* @returns {Promise<(EntriesHandle)>}
**/
module.exports.getEntries = (appToken, mdHandle) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles[mdHandle].getEntries())
          .then(addEntriesObj);
}

/**
* Get a Handle to the keys associated with this mdata
* @param {String} appToken - the application token
* @param {Handle} mdHandle - the MutableData handle
* @returns {Promise<(KeysHandle)>}
**/
module.exports.getKeys = (appToken, mdHandle) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles[mdHandle].getKeys())
          .then(addKeysObj);
}

/**
* Get a Handle to the values associated with this mdata
* @param {String} appToken - the application token
* @param {Handle} mdHandle - the MutableData handle
* @returns {Promise<(ValuesHandle)>}
**/
module.exports.getValues = (appToken, mdHandle) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles[mdHandle].getValues())
          .then(addValuesObj);
}

/**
* Get a Handle to the permissions associated with this mdata
* @param {String} appToken - the application token
* @param {Handle} mdHandle - the MutableData handle
* @returns {Promise<(PermissionsHandle)>}
**/
module.exports.getPermissions = (appToken, mdHandle) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles[mdHandle].getPermissions());
//          .then(addPermissionsObj);
}

/**
* Get a Handle to the permissions associated with this mdata for
* a specifc key
* @param {String} appToken - the application token
* @param {Handle} mdHandle - the MutableData handle
* @param {SignKey} signKey - the key to look up
* @returns {Promise<(PermissionsHandle)>}
**/
module.exports.getUserPermissions = (appToken, mdHandle, signKey) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles[mdHandle].getUserPermissions(signKey));
//          .then(addPermissionsSetObj);
}

/**
* Delete the permissions of a specifc key. Directly commits to the network.
* Requires 'ManagePermissions'-Permission for the app.
* @param {String} appToken - the application token
* @param {Handle} mdHandle - the MutableData handle
* @param {SignKey} signKey - the key to lookup for
* @param {Number} version - the current version, to confirm you are
*        actually asking for the right state
* @returns {Promise} - once finished
**/
module.exports.delUserPermissions = (appToken, mdHandle, signKey, version) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles[mdHandle].delUserPermissions(signKey, version));
}

/**
* Set the permissions of a specifc key. Directly commits to the network.
* Requires 'ManagePermissions'-Permission for the app.
* @param {String} appToken - the application token
* @param {Handle} mdHandle - the MutableData handle
* @param {SignKey} signKey - the key to lookup for
* @param {PermissionSet} pmSet - the permissionset to set to
* @param {Number} version - the current version, to confirm you are
*        actually asking for the right state
* @returns {Promise} - once finished
**/
module.exports.setUserPermissions = (appToken, mdHandle, signKey, pmSet, version) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles[mdHandle].setUserPermissions(signKey, pmSet, version));
}

/**
* Commit the transaction to the network
* @param {String} appToken - the application token
* @param {Handle} mdHandle - the MutableData handle
* @param {EntryMutationTransaction} mutations - the Mutations you want to apply
* @return {Promise}
**/
module.exports.applyEntriesMutation = (appToken, mdHandle, mutations) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles[mdHandle].applyEntriesMutation(mutations));
}

/**
* Serialise the current mdata
* @param {String} appToken - the application token
* @param {Handle} mdHandle - the MutableData handle
* @returns {Promise<(String)>}
**/
module.exports.serialise = (appToken, mdHandle) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles[mdHandle].serialise());
}

/**
* Wrap this MData into a known abstraction. Currently known: `NFS`
* @param {String} appToken - the application token
* @param {Handle} mdHandle - the MutableData handle
* @param {String} eml - name of the emulation
* @returns {EmulationHandle} the Emulation you are asking for
**/
module.exports.emulateAs = (appToken, mdHandle, eml) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles[mdHandle].emulateAs(eml));
}
