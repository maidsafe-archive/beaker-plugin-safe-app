const { genHandle, getObj, freeObj } = require('./helpers');

module.exports.manifest = {
  newRandomPrivate: 'promise',
  newRandomPublic: 'promise',
  newPrivate: 'promise',
  newPublic: 'promise',
  newPermissions: 'promise',
  newPermissionSet: 'promise',
  newMutation: 'promise',
  newEntries: 'promise',
  quickSetup: 'promise',
  encryptKey: 'promise',
  encryptValue: 'promise',
  decrypt: 'promise',
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
  fromSerial: 'promise',
  emulateAs: 'promise',
  free: 'sync'
};

/**
 * Create a new mutuable data at a random address with private
 * access.
 * @param {String} appToken - the application token
 * @param {Number} typeTag - the typeTag to use
 * @returns {Promise<MutableDataHandle>}
 **/
module.exports.newRandomPrivate = (appToken, typeTag) => {
  return getObj(appToken)
    .then((obj) => obj.app.mutableData.newRandomPrivate(typeTag)
      .then((md) => genHandle(obj.app, md)));
};

/**
 * Create a new mutuable data at a random address with public
 * access.
 * @param {String} appToken - the application token
 * @param {Number} typeTag - the typeTag to use
 * @returns {Promise<MutableDataHandle>}
 **/
module.exports.newRandomPublic = (appToken, typeTag) => {
  return getObj(appToken)
    .then((obj) => obj.app.mutableData.newRandomPublic(typeTag)
      .then((md) => genHandle(obj.app, md)));
};

/**
 * Initiate a mutuable data at the given address with private
 * access.
 * @param {String} appToken - the application token
 * @param {Buffer|String}
 * @param {Number} typeTag - the typeTag to use
 * @returns {Promise<MutableDataHandle>}
 **/
module.exports.newPrivate = (appToken, name, typeTag) => {
  return getObj(appToken)
    .then((obj) => obj.app.mutableData.newPrivate(name, typeTag)
      .then((md) => genHandle(obj.app, md)));
};

/**
 * Initiate a mutuable data at the given address with public
 * access.
 * @param {String} appToken - the application token
 * @param {Buffer|String}
 * @param {Number} typeTag - the typeTag to use
 * @returns {Promise<MutableDataHandle>}
 **/
module.exports.newPublic = (appToken, name, typeTag) => {
  return getObj(appToken)
    .then((obj) => obj.app.mutableData.newPublic(name, typeTag)
      .then((md) => genHandle(obj.app, md)));
};

/**
 * Create a new Permissions object.
 * @param {String} appToken - the application token
 * @returns {Promise<PermissionsHandle>}
 **/
module.exports.newPermissions = (appToken) => {
  return getObj(appToken)
    .then((obj) => obj.app.mutableData.newPermissions()
      .then((perm) => genHandle(obj.app, perm)));
};

/**
 * Create a new PermissionsSet object.
 * @param {String} appToken - the application token
 * @returns {Promise<PermissionsSetHandle>}
 **/
module.exports.newPermissionSet = (appToken) => {
  return getObj(appToken)
    .then((obj) => obj.app.mutableData.newPermissionSet()
      .then((permSet) => genHandle(obj.app, permSet)));
};

/**
 * Create a new Mutation object.
 * @param {String} appToken - the application token
 * @returns {Promise<MutationHandle>}
 **/
module.exports.newMutation = (appToken) => {
  return getObj(appToken)
    .then((obj) => obj.app.mutableData.newMutation()
      .then((mut) => genHandle(obj.app, mut)));
};

/**
 * Create a new Entries object.
 * @param {String} appToken - the application token
 * @returns {Promise<EntriesHandle>}
 **/
module.exports.newEntries = (appToken) => {
  return getObj(appToken)
    .then((obj) => obj.app.mutableData.newEntries()
      .then((entries) => genHandle(obj.app, entries)));
};

// MutableData functions
/**
 * Quickly set up a newly (not yet created) MutableData with
 * the app having full-access permissions (and no other).
 *
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @param {Object=} data - a key-value payload it should
 *        create the data with
 * @returns {Promise<MutableDataHandle>} - self
 **/
module.exports.quickSetup = (mdHandle, data) => {
  return getObj(mdHandle)
    .then((obj) => obj.netObj.quickSetup(data))
    .then(() => mdHandle);
};

/**
 * Encrypt the entry key provided as parameter with the encryption key
 * contained in a Private MutableData. If the MutableData is Public, the same
 * (and unencrypted) value is returned.
 *
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @param {(String|Buffer)} key - the key you want to encrypt
 * @returns {Promise<Key>} - the encrypted entry key
 **/
module.exports.encryptKey = (mdHandle, key) => {
  return getObj(mdHandle)
    .then((obj) => obj.netObj.encryptKey(key));
};

/**
 * Encrypt the entry value provided as parameter with the encryption key
 * contained in a Private MutableData. If the MutableData is Public, the same
 * (and unencrypted) value is returned.
 *
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @param {(String|Buffer)} value - the data you want to encrypt
 * @returns {Promise<Value>} - the encrypted entry value
 **/
module.exports.encryptValue = (mdHandle, value) => {
  return getObj(mdHandle)
    .then((obj) => obj.netObj.encryptValue(value));
};

/**
 * Decrypt the entry key/value provided as parameter with the encryption key
 * contained in a Private MutableData.
 *
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @param {(String|Buffer)} value - the data you want to decrypt
 * @returns {Promise<Value>} - the decrypted value
 **/
module.exports.decrypt = (mdHandle, value) => {
  return getObj(mdHandle)
    .then((obj) => obj.netObj.decrypt(value));
};

/**
 * Look up the name and tag of the MutableData as required to look it
 * up on the network.
 *
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @returns {Promise<NameAndTag>}
 **/
module.exports.getNameAndTag = (mdHandle) => {
  return getObj(mdHandle)
    .then((obj) => obj.netObj.getNameAndTag());
};

/**
 * Look up the mutable data object version on the network
 *
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @returns {Promise<Number>} the version
 **/
module.exports.getVersion = (mdHandle) => {
  return getObj(mdHandle)
    .then((obj) => obj.netObj.getVersion());
};

/**
 * Look up the value of a specific key
 *
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @param {String} key - the entry's key
 * @returns {Promise<ValueVersion>} - the value at the current version
 **/
module.exports.get = (mdHandle, key) => {
  return getObj(mdHandle)
    .then((obj) => obj.netObj.get(key));
};

/**
 * Create this MutableData on the network.
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @param {PermissionsHandle} permissionsHandle - the permissions to create the mdata with
 * @param {EntriesHandle} entriesHandle - data payload to create the mdata with
 * @returns {Promise<()>}
 **/
module.exports.put = (mdHandle, permissionsHandle, entriesHandle) => {
  return getObj(mdHandle)
    .then((mdObj) => getObj(permissionsHandle)
      .then((permsObj) => getObj(entriesHandle)
        .then((entriesObj) => mdObj.netObj.put(persObj.netObj, entriesObj.netObj))
      ));
};

/**
 * Get a Handle to the entries associated with this mdata
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @returns {Promise<(EntriesHandle)>}
 **/
module.exports.getEntries = (mdHandle) => {
  return getObj(mdHandle)
    .then((obj) => obj.netObj.getEntries()
      .then((entries) => genHandle(obj.app, entries)));
};

/**
 * Get a Handle to the keys associated with this mdata
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @returns {Promise<(KeysHandle)>}
 **/
module.exports.getKeys = (mdHandle) => {
  return getObj(mdHandle)
    .then((obj) => obj.netObj.getKeys()
      .then((keys) => genHandle(obj.app, keys)));
};

/**
 * Get a Handle to the values associated with this mdata
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @returns {Promise<(ValuesHandle)>}
 **/
module.exports.getValues = (mdHandle) => {
  return getObj(mdHandle)
    .then((obj) => obj.netObj.getValues()
      .then((values) => genHandle(obj.app, values)));
};

/**
 * Get a Handle to the permissions associated with this mdata
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @returns {Promise<(PermissionsHandle)>}
 **/
module.exports.getPermissions = (mdHandle) => {
  return getObj(mdHandle)
    .then((obj) => obj.netObj.getPermissions()
      .then((perms) => genHandle(obj.app, perms)));
};

/**
 * Get a Handle to the permissions associated with this mdata for
 * a specifc key
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @param {SignKeyHandle} signKeyHandle - the sign key to look up
 * @returns {Promise<(PermissionsSetHandle)>}
 **/
module.exports.getUserPermissions = (mdHandle, signKeyHandle) => {
  return getObj(signKeyHandle)
    .then((signKeyObj) => getObj(mdHandle)
      .then((mdObj) => mdObj.netObj.getUserPermissions(signKeyObj.netObj)
        .then((permSet) => genHandle(mdObj.app, permSet)))
    );
};

/**
 * Delete the permissions of a specifc key. Directly commits to the network.
 * Requires 'ManagePermissions'-Permission for the app.
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @param {SignKeyHandle} signKeyHandle - the sign key to lookup for
 * @param {Number} version - the current version, to confirm you are
 *        actually asking for the right state
 * @returns {Promise} - once finished
 **/
module.exports.delUserPermissions = (mdHandle, signKeyHandle, version) => {
  return getObj(signKeyHandle)
    .then((signKeyObj) => getObj(mdHandle)
      .then((mdObj) => mdObj.netObj.delUserPermissions(signKeyObj.netObj, version))
    );
};

/**
 * Set the permissions of a specifc key. Directly commits to the network.
 * Requires 'ManagePermissions'-Permission for the app.
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @param {SignKeyHandle} signKeyHandle - the sign key to lookup for
 * @param {PermissionsSetHandle} pmSetHandle - the PermissionsSet to set to
 * @param {Number} version - the current version, to confirm you are
 *        actually asking for the right state
 * @returns {Promise} - once finished
 **/
module.exports.setUserPermissions = (mdHandle, signKeyHandle, pmSetHandle, version) => {
  return getObj(signKeyHandle)
      .then((signKeyObj) => getObj(pmSetHandle)
        .then((pmSetObj) => getObj(mdHandle)
          .then((mdObj) => mdObj.netObj.setUserPermissions(signKeyObj.netObj,
                                                        pmSetObj.netObj, version))
        ));
};

/**
 * Commit the transaction to the network
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @param {MutationHandle} mutationHandle - the Mutation you want to apply
 * @return {Promise}
 **/
module.exports.applyEntriesMutation = (mdHandle, mutationHandle) => {
  return getObj(mutationHandle)
    .then((mutationObj) => getObj(mdHandle)
      .then((mdObj) => mdObj.netObj.applyEntriesMutation(mutationObj.netObj))
    );
};

/**
 * Serialise the current mdata
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @returns {Promise<(String)>}
 **/
module.exports.serialise = (mdHandle) => {
  return getObj(mdHandle)
    .then((obj) => obj.netObj.serialise());
};

/**
 * Deserialize the mdata
 * @param {String} appToken - the application token
 * @returns {Promise<MutableDataHandle>}
 */
module.exports.fromSerial = (appToken, data) => {
  return getObj(appToken)
    .then((obj) => obj.app.mutableData.fromSerial(data)
      .then((md) => genHandle(obj.app, md)));
};

/**
 * Wrap this MData into a known abstraction. Currently known: `NFS`
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @param {String} eml - name of the emulation
 * @returns {EmulationHandle} the Emulation you are asking for
 **/
module.exports.emulateAs = (mdHandle, eml) => {
  return getObj(mdHandle)
    .then((obj) => obj.netObj.emulateAs(eml)
      .then((em) => genHandle(obj.app, em)));
};

/**
 * Free the MutableData instance from memory
 * @param {String} mdHandle - the MutableData handle
 */
module.exports.free = (mdHandle) => freeObj(mdHandle);
