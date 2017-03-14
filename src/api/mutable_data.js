const safe_app = require('safe-app');
const newEntriesObj = require('./mutable_data_entries').newEntriesObj;
const newKeysObj = require('./mutable_data_keys').newKeysObj;
const newValuesObj = require('./mutable_data_values').newValuesObj;
const newPermissionsObj = require('./mutable_data_permissions').newPermissionsObj;
const newPermissionsSetObj = require('./mutable_data_permissions_set').newPermissionsSetObj;
const addObjToMap = require('./helpers').addObjToMap;
var appTokens = require('./app_tokens');

var md_handles = new Map();

const newMutableDataObj = (md) => addObjToMap(md_handles, md);

module.exports.newMutableDataObj = newMutableDataObj;

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
};

/**
* Create a new mutuable data at a random address with private
* access.
* @param {String} appToken - the application token
* @param {Number} typeTag - the typeTag to use
* @returns {Promise<MutableDataHandle>}
**/
module.exports.newRandomPrivate = (appToken, typeTag) => {
  return appTokens.getApp(appToken)
          .then((app) => app.mutableData.newRandomPrivate(typeTag))
          .then(newMutableDataObj);
}

/**
* Create a new mutuable data at a random address with public
* access.
* @param {String} appToken - the application token
* @param {Number} typeTag - the typeTag to use
* @returns {Promise<MutableDataHandle>}
**/
module.exports.newRandomPublic = (appToken, typeTag) => {
  return appTokens.getApp(appToken)
          .then((app) => app.mutableData.newRandomPublic(typeTag))
          .then(newMutableDataObj);
}

/**
* Initiate a mutuable data at the given address with private
* access.
* @param {String} appToken - the application token
* @param {Buffer|String}
* @param {Number} typeTag - the typeTag to use
* @returns {Promise<MutableDataHandle>}
**/
module.exports.newPrivate = (appToken, name, typeTag) => {
  return appTokens.getApp(appToken)
          .then((app) => app.mutableData.newPrivate(name, typeTag))
          .then(newMutableDataObj);
}

/**
* Initiate a mutuable data at the given address with public
* access.
* @param {String} appToken - the application token
* @param {Buffer|String}
* @param {Number} typeTag - the typeTag to use
* @returns {Promise<MutableDataHandle>}
**/
module.exports.newPublic = (appToken, name, typeTag) => {
  return appTokens.getApp(appToken)
          .then((app) => app.mutableData.newPublic(name, typeTag))
          .then(newMutableDataObj);
}

// MutableData functions
/**
* Quickly set up a newly (not yet created) MutableData with
* the app having full-access permissions (and no other).
*
* @param {String} appToken - the application token
* @param {MutableDataHandle} mdHandle - the MutableData handle
* @param {Object=} data - a key-value payload it should
*        create the data with
* @returns {Promise<MutableDataHandle>} - self
**/
module.exports.quickSetup = (appToken, mdHandle, data) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles.get(mdHandle).quickSetup(data))
          .then((md) => mdHandle);
}

/**
* Encrypt the entry key provided as parameter with the encryption key
* contained in a Private MutableData. If the MutableData is Public, the same
* (and unencrypted) value is returned.
*
* @param {String} appToken - the application token
* @param {MutableDataHandle} mdHandle - the MutableData handle
* @param {(String|Buffer)} key - the key you want to encrypt
* @returns {Promise<Key>} - the encrypted entry key
**/
module.exports.encryptKey = (appToken, mdHandle, key) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles.get(mdHandle).encryptKey(key));
}

/**
* Encrypt the entry value provided as parameter with the encryption key
* contained in a Private MutableData. If the MutableData is Public, the same
* (and unencrypted) value is returned.
*
* @param {String} appToken - the application token
* @param {MutableDataHandle} mdHandle - the MutableData handle
* @param {(String|Buffer)} value - the data you want to encrypt
* @returns {Promise<Value>} - the encrypted entry value
**/
module.exports.encryptValue = (appToken, mdHandle, value) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles.get(mdHandle).encryptValue(value));
}

/**
* Look up the name and tag of the MutableData as required to look it
* up on the network.
*
* @param {String} appToken - the application token
* @param {MutableDataHandle} mdHandle - the MutableData handle
* @returns {Promise<NameAndTag>}
**/
module.exports.getNameAndTag = (appToken, mdHandle) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles.get(mdHandle).getNameAndTag());
}

/**
* Look up the mutable data object version on the network
*
* @param {String} appToken - the application token
* @param {MutableDataHandle} mdHandle - the MutableData handle
* @returns {Promise<Number>} the version
**/
module.exports.getVersion = (appToken, mdHandle) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles.get(mdHandle).getVersion());
}

/**
* Look up the value of a specific key
*
* @param {String} appToken - the application token
* @param {MutableDataHandle} mdHandle - the MutableData handle
* @param {String} key - the entry's key
* @returns {Promise<ValueVersion>} - the value at the current version
**/
module.exports.get = (appToken, mdHandle, key) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles.get(mdHandle).get(key));
}

/**
* Create this MutableData on the network.
* @param {String} appToken - the application token
* @param {MutableDataHandle} mdHandle - the MutableData handle
* @param {Permission} permissions - the permissions to create the mdata with
* @param {Entries} entries - data payload to create the mdata with
* @returns {Promise<()>}
**/
module.exports.put = (appToken, mdHandle, permissions, entries) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles.get(mdHandle).put(permissions, entries));
}

/**
* Get a Handle to the entries associated with this mdata
* @param {String} appToken - the application token
* @param {MutableDataHandle} mdHandle - the MutableData handle
* @returns {Promise<(EntriesHandle)>}
**/
module.exports.getEntries = (appToken, mdHandle) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles.get(mdHandle).getEntries())
          .then(newEntriesObj);
}

/**
* Get a Handle to the keys associated with this mdata
* @param {String} appToken - the application token
* @param {MutableDataHandle} mdHandle - the MutableData handle
* @returns {Promise<(KeysHandle)>}
**/
module.exports.getKeys = (appToken, mdHandle) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles.get(mdHandle).getKeys())
          .then(newKeysObj);
}

/**
* Get a Handle to the values associated with this mdata
* @param {String} appToken - the application token
* @param {MutableDataHandle} mdHandle - the MutableData handle
* @returns {Promise<(ValuesHandle)>}
**/
module.exports.getValues = (appToken, mdHandle) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles.get(mdHandle).getValues())
          .then(newValuesObj);
}

/**
* Get a Handle to the permissions associated with this mdata
* @param {String} appToken - the application token
* @param {MutableDataHandle} mdHandle - the MutableData handle
* @returns {Promise<(PermissionsHandle)>}
**/
module.exports.getPermissions = (appToken, mdHandle) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles.get(mdHandle).getPermissions())
          .then(newPermissionsObj);
}

/**
* Get a Handle to the permissions associated with this mdata for
* a specifc key
* @param {String} appToken - the application token
* @param {MutableDataHandle} mdHandle - the MutableData handle
* @param {SignKey} signKey - the key to look up
* @returns {Promise<(PermissionsSetHandle)>}
**/
module.exports.getUserPermissions = (appToken, mdHandle, signKey) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles.get(mdHandle).getUserPermissions(signKey))
          .then(newPermissionsSetObj);
}

/**
* Delete the permissions of a specifc key. Directly commits to the network.
* Requires 'ManagePermissions'-Permission for the app.
* @param {String} appToken - the application token
* @param {MutableDataHandle} mdHandle - the MutableData handle
* @param {SignKey} signKey - the key to lookup for
* @param {Number} version - the current version, to confirm you are
*        actually asking for the right state
* @returns {Promise} - once finished
**/
module.exports.delUserPermissions = (appToken, mdHandle, signKey, version) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles.get(mdHandle).delUserPermissions(signKey, version));
}

/**
* Set the permissions of a specifc key. Directly commits to the network.
* Requires 'ManagePermissions'-Permission for the app.
* @param {String} appToken - the application token
* @param {MutableDataHandle} mdHandle - the MutableData handle
* @param {SignKey} signKey - the key to lookup for
* @param {PermissionsSetHandle} pmSetHandle - the PermissionsSet to set to
* @param {Number} version - the current version, to confirm you are
*        actually asking for the right state
* @returns {Promise} - once finished
**/
module.exports.setUserPermissions = (appToken, mdHandle, signKey, pmSetHandle, version) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles.get(mdHandle).setUserPermissions(signKey, pmSetHandle, version));
}

/**
* Commit the transaction to the network
* @param {String} appToken - the application token
* @param {MutableDataHandle} mdHandle - the MutableData handle
* @param {MutationHandle} mutations - the Mutations you want to apply
* @return {Promise}
**/
module.exports.applyEntriesMutation = (appToken, mdHandle, mutations) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles.get(mdHandle).applyEntriesMutation(mutations));
}

/**
* Serialise the current mdata
* @param {String} appToken - the application token
* @param {MutableDataHandle} mdHandle - the MutableData handle
* @returns {Promise<(String)>}
**/
module.exports.serialise = (appToken, mdHandle) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles.get(mdHandle).serialise());
}

/**
* Wrap this MData into a known abstraction. Currently known: `NFS`
* @param {String} appToken - the application token
* @param {MutableDataHandle} mdHandle - the MutableData handle
* @param {String} eml - name of the emulation
* @returns {EmulationHandle} the Emulation you are asking for
**/
module.exports.emulateAs = (appToken, mdHandle, eml) => {
  return appTokens.getApp(appToken)
          .then((app) => md_handles.get(mdHandle).emulateAs(eml));
}
