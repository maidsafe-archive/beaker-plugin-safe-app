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
    .then((app) => app.mutableData.newRandomPrivate(typeTag))
    .then(genHandle);
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
    .then((app) => app.mutableData.newRandomPublic(typeTag))
    .then(genHandle);
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
    .then((app) => app.mutableData.newPrivate(name, typeTag))
    .then(genHandle);
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
    .then((app) => app.mutableData.newPublic(name, typeTag))
    .then(genHandle);
};

/**
 * Create a new Permissions object.
 * @param {String} appToken - the application token
 * @returns {Promise<PermissionsHandle>}
 **/
module.exports.newPermissions = (appToken) => {
  return getObj(appToken)
    .then((app) => app.mutableData.newPermissions())
    .then(genHandle);
};

/**
 * Create a new PermissionsSet object.
 * @param {String} appToken - the application token
 * @returns {Promise<PermissionsSetHandle>}
 **/
module.exports.newPermissionSet = (appToken) => {
  return getObj(appToken)
    .then((app) => app.mutableData.newPermissionSet())
    .then(genHandle);
};

/**
 * Create a new Mutation object.
 * @param {String} appToken - the application token
 * @returns {Promise<MutationHandle>}
 **/
module.exports.newMutation = (appToken) => {
  return getObj(appToken)
    .then((app) => app.mutableData.newMutation())
    .then(genHandle);
};

/**
 * Create a new Entries object.
 * @param {String} appToken - the application token
 * @returns {Promise<EntriesHandle>}
 **/
module.exports.newEntries = (appToken) => {
  return getObj(appToken)
    .then((app) => app.mutableData.newEntries())
    .then(genHandle);
};

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
  return getObj(appToken)
    .then(() => getObj(mdHandle))
    .then((md) => md.quickSetup(data))
    .then(() => mdHandle);
};

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
  return getObj(appToken)
    .then(() => getObj(mdHandle))
    .then((md) => md.encryptKey(key));
};

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
  return getObj(appToken)
    .then(() => getObj(mdHandle))
    .then((md) => md.encryptValue(value));
};

/**
 * Decrypt the entry key/value provided as parameter with the encryption key
 * contained in a Private MutableData.
 *
 * @param {String} appToken - the application token
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @param {(String|Buffer)} value - the data you want to decrypt
 * @returns {Promise<Value>} - the decrypted value
 **/
module.exports.decrypt = (appToken, mdHandle, value) => {
  return getObj(appToken)
    .then(() => getObj(mdHandle))
    .then((md) => md.decrypt(value));
};

/**
 * Look up the name and tag of the MutableData as required to look it
 * up on the network.
 *
 * @param {String} appToken - the application token
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @returns {Promise<NameAndTag>}
 **/
module.exports.getNameAndTag = (appToken, mdHandle) => {
  return getObj(appToken)
    .then(() => getObj(mdHandle))
    .then((md) => md.getNameAndTag());
};

/**
 * Look up the mutable data object version on the network
 *
 * @param {String} appToken - the application token
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @returns {Promise<Number>} the version
 **/
module.exports.getVersion = (appToken, mdHandle) => {
  return getObj(appToken)
    .then(() => getObj(mdHandle))
    .then((md) => md.getVersion());
};

/**
 * Look up the value of a specific key
 *
 * @param {String} appToken - the application token
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @param {String} key - the entry's key
 * @returns {Promise<ValueVersion>} - the value at the current version
 **/
module.exports.get = (appToken, mdHandle, key) => {
  return getObj(appToken)
    .then(() => getObj(mdHandle))
    .then((md) => md.get(key));
};

/**
 * Create this MutableData on the network.
 * @param {String} appToken - the application token
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @param {PermissionsHandle} permissionsHandle - the permissions to create the mdata with
 * @param {EntriesHandle} entriesHandle - data payload to create the mdata with
 * @returns {Promise<()>}
 **/
module.exports.put = (appToken, mdHandle, permissionsHandle, entriesHandle) => {
  return getObj(appToken)
    .then(() => getObj(mdHandle))
    .then((md) => getObj(permissionsHandle)
      .then((permissions) => getObj(entriesHandle)
        .then((entries) => md.put(permissions, entries))
      ));
};

/**
 * Get a Handle to the entries associated with this mdata
 * @param {String} appToken - the application token
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @returns {Promise<(EntriesHandle)>}
 **/
module.exports.getEntries = (appToken, mdHandle) => {
  return getObj(appToken)
    .then(() => getObj(mdHandle))
    .then((md) => md.getEntries())
    .then(genHandle);
};

/**
 * Get a Handle to the keys associated with this mdata
 * @param {String} appToken - the application token
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @returns {Promise<(KeysHandle)>}
 **/
module.exports.getKeys = (appToken, mdHandle) => {
  return getObj(appToken)
    .then(() => getObj(mdHandle))
    .then((md) => md.getKeys())
    .then(genHandle);
};

/**
 * Get a Handle to the values associated with this mdata
 * @param {String} appToken - the application token
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @returns {Promise<(ValuesHandle)>}
 **/
module.exports.getValues = (appToken, mdHandle) => {
  return getObj(appToken)
    .then(() => getObj(mdHandle))
    .then((md) => md.getValues())
    .then(genHandle);
};

/**
 * Get a Handle to the permissions associated with this mdata
 * @param {String} appToken - the application token
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @returns {Promise<(PermissionsHandle)>}
 **/
module.exports.getPermissions = (appToken, mdHandle) => {
  return getObj(appToken)
    .then(() => getObj(mdHandle))
    .then((md) => md.getPermissions())
    .then(genHandle);
};

/**
 * Get a Handle to the permissions associated with this mdata for
 * a specifc key
 * @param {String} appToken - the application token
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @param {SignKeyHandle} signKeyHandle - the sign key to look up
 * @returns {Promise<(PermissionsSetHandle)>}
 **/
module.exports.getUserPermissions = (appToken, mdHandle, signKeyHandle) => {
  return getObj(appToken)
    .then(() => getObj(signKeyHandle))
    .then((signKey) => getObj(mdHandle)
      .then((md) => md.getUserPermissions(signKey))
      .then(genHandle)
    );
};

/**
 * Delete the permissions of a specifc key. Directly commits to the network.
 * Requires 'ManagePermissions'-Permission for the app.
 * @param {String} appToken - the application token
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @param {SignKeyHandle} signKeyHandle - the sign key to lookup for
 * @param {Number} version - the current version, to confirm you are
 *        actually asking for the right state
 * @returns {Promise} - once finished
 **/
module.exports.delUserPermissions = (appToken, mdHandle, signKeyHandle, version) => {
  return getObj(appToken)
    .then(() => getObj(signKeyHandle))
    .then((signKey) => getObj(mdHandle)
      .then((md) => md.delUserPermissions(signKey, version))
    );
};

/**
 * Set the permissions of a specifc key. Directly commits to the network.
 * Requires 'ManagePermissions'-Permission for the app.
 * @param {String} appToken - the application token
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @param {SignKeyHandle} signKeyHandle - the sign key to lookup for
 * @param {PermissionsSetHandle} pmSetHandle - the PermissionsSet to set to
 * @param {Number} version - the current version, to confirm you are
 *        actually asking for the right state
 * @returns {Promise} - once finished
 **/
module.exports.setUserPermissions = (appToken, mdHandle, signKeyHandle, pmSetHandle, version) => {
  return getObj(appToken)
    .then(() => getObj(signKeyHandle)
      .then((signKey) => getObj(pmSetHandle)
        .then((pmSet) => getObj(mdHandle)
          .then((md) => md.setUserPermissions(signKey, pmSet, version))
        )));
};

/**
 * Commit the transaction to the network
 * @param {String} appToken - the application token
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @param {MutationHandle} mutationHandle - the Mutation you want to apply
 * @return {Promise}
 **/
module.exports.applyEntriesMutation = (appToken, mdHandle, mutationHandle) => {
  return getObj(appToken)
    .then(() => getObj(mutationHandle))
    .then((mutation) => getObj(mdHandle)
      .then((md) => md.applyEntriesMutation(mutation))
    );
};

/**
 * Serialise the current mdata
 * @param {String} appToken - the application token
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @returns {Promise<(String)>}
 **/
module.exports.serialise = (appToken, mdHandle) => {
  return getObj(appToken)
    .then(() => getObj(mdHandle))
    .then((md) => md.serialise());
};

/**
 * Deserialize the mdata
 * @param {String} appToken - the application token
 * @returns {Promise<MutableDataHandle>}
 */
module.exports.fromSerial = (appToken, data) => {
  return getObj(appToken)
    .then((app) => app.mutableData.fromSerial(data))
    .then(genHandle);
};

/**
 * Wrap this MData into a known abstraction. Currently known: `NFS`
 * @param {String} appToken - the application token
 * @param {MutableDataHandle} mdHandle - the MutableData handle
 * @param {String} eml - name of the emulation
 * @returns {EmulationHandle} the Emulation you are asking for
 **/
module.exports.emulateAs = (appToken, mdHandle, eml) => {
  return getObj(appToken)
    .then(() => getObj(mdHandle))
    .then((md) => md.emulateAs(eml))
    .then(genHandle);
};

/**
 * Free the MutableData instance from memory
 * @param {String} mdHandle - the MutableData handle
 */
module.exports.free = (mdHandle) => freeObj(mdHandle);
