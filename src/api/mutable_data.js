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
 * @name window.safeMutableData.newRandomPrivate
 *
 * @param {SAFEAppToken} appToken the app handle
 * @param {Number} typeTag the typeTag to use
 *
 * @returns {Promise<MutableDataHandle>} the MutableData handle the MutableData handle
 **/
module.exports.newRandomPrivate = (appToken, typeTag) => {
  return getObj(appToken)
    .then((obj) => obj.app.mutableData.newRandomPrivate(typeTag)
      .then((md) => genHandle(obj.app, md)));
};

/**
 * Create a new mutuable data at a random address with public
 * access.
 * @name window.safeMutableData.newRandomPublic
 *
 * @param {SAFEAppToken} appToken the app handle
 * @param {Number} typeTag the typeTag to use
 *
 * @returns {Promise<MutableDataHandle>} the MutableData handle
 **/
module.exports.newRandomPublic = (appToken, typeTag) => {
  return getObj(appToken)
    .then((obj) => obj.app.mutableData.newRandomPublic(typeTag)
      .then((md) => genHandle(obj.app, md)));
};

/**
 * Initiate a mutuable data at the given address with private
 * access.
 * @name window.safeMutableData.newPrivate
 *
 * @param {SAFEAppToken} appToken the app handle
 * @param {(String|Buffer)} name Xor name/address of the MutbleData
 * @param {Number} typeTag the typeTag to use
 *
 * @returns {Promise<MutableDataHandle>} the MutableData handle
 **/
module.exports.newPrivate = (appToken, name, typeTag) => {
  return getObj(appToken)
    .then((obj) => obj.app.mutableData.newPrivate(name, typeTag)
      .then((md) => genHandle(obj.app, md)));
};

/**
 * Initiate a mutuable data at the given address with public
 * access.
 * @name window.safeMutableData.newPublic
 *
 * @param {SAFEAppToken} appToken the app handle
 * @param {(String|Buffer)} name Xor name/address of the MutbleData
 * @param {Number} typeTag the typeTag to use
 *
 * @returns {Promise<MutableDataHandle>} the MutableData handle
 **/
module.exports.newPublic = (appToken, name, typeTag) => {
  return getObj(appToken)
    .then((obj) => obj.app.mutableData.newPublic(name, typeTag)
      .then((md) => genHandle(obj.app, md)));
};

/**
 * Create a new Permissions object.
 * @name window.safeMutableData.newPermissions
 *
 * @param {SAFEAppToken} appToken the app handle
 *
 * @returns {Promise<PermissionsHandle>} the Permissions handle
 **/
module.exports.newPermissions = (appToken) => {
  return getObj(appToken)
    .then((obj) => obj.app.mutableData.newPermissions()
      .then((perm) => genHandle(obj.app, perm)));
};

/**
 * Create a new PermissionsSet object.
 * @name window.safeMutableData.newPermissionSet
 *
 * @param {SAFEAppToken} appToken the app handle
 *
 * @returns {Promise<PermissionsSetHandle>} the PermissionsSet handle
 **/
module.exports.newPermissionSet = (appToken) => {
  return getObj(appToken)
    .then((obj) => obj.app.mutableData.newPermissionSet()
      .then((permSet) => genHandle(obj.app, permSet)));
};

/**
 * Create a new Mutation object.
 * @name window.safeMutableData.newMutation
 *
 * @param {SAFEAppToken} appToken the app handle
 *
 * @returns {Promise<MutationHandle>} the Mutation handle
 **/
module.exports.newMutation = (appToken) => {
  return getObj(appToken)
    .then((obj) => obj.app.mutableData.newMutation()
      .then((mut) => genHandle(obj.app, mut)));
};

/**
 * Create a new Entries object.
 * @name window.safeMutableData.newEntries
 *
 * @param {SAFEAppToken} appToken the app handle
 *
 * @returns {Promise<EntriesHandle>} the Entries handle
 **/
module.exports.newEntries = (appToken) => {
  return getObj(appToken)
    .then((obj) => obj.app.mutableData.newEntries()
      .then((entries) => genHandle(obj.app, entries)));
};

// MutableData functions
/**
 * Set up a newly (not yet committed/created) MutableData with
 * the app having full-access permissions (and no other).
 * @name window.safeMutableData.quickSetup
 *
 * @param {MutableDataHandle} mdHandle the MutableData handle
 * @param {Object} data a key-value payload it should create the data with
 *
 * @returns {Promise<MutableDataHandle>} the same MutableData handle
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
 * @name window.safeMutableData.encryptKey
 *
 * @param {MutableDataHandle} mdHandle the MutableData handle
 * @param {(String|Buffer)} key the key you want to encrypt
 *
 * @returns {Promise<Key>} the encrypted entry key
 **/
module.exports.encryptKey = (mdHandle, key) => {
  return getObj(mdHandle)
    .then((obj) => obj.netObj.encryptKey(key));
};

/**
 * Encrypt the entry value provided as parameter with the encryption key
 * contained in a Private MutableData. If the MutableData is Public, the same
 * (and unencrypted) value is returned.
 * @name window.safeMutableData.encryptValue
 *
 * @param {MutableDataHandle} mdHandle the MutableData handle
 * @param {(String|Buffer)} value the data you want to encrypt
 *
 * @returns {Promise<Value>} the encrypted entry value
 **/
module.exports.encryptValue = (mdHandle, value) => {
  return getObj(mdHandle)
    .then((obj) => obj.netObj.encryptValue(value));
};

/**
 * Decrypt the entry key/value provided as parameter with the encryption key
 * contained in a Private MutableData.
 * @name window.safeMutableData.decrypt
 *
 * @param {MutableDataHandle} mdHandle the MutableData handle
 * @param {(String|Buffer)} value the data you want to decrypt
 *
 * @returns {Promise<Value>} the decrypted value
 **/
module.exports.decrypt = (mdHandle, value) => {
  return getObj(mdHandle)
    .then((obj) => obj.netObj.decrypt(value));
};

/**
 * Look up the name and tag of the MutableData as required to look it
 * up on the network.
 * @name window.safeMutableData.getNameAndTag
 *
 * @param {MutableDataHandle} mdHandle the MutableData handle
 *
 * @returns {Promise<NameAndTag>} the name and tag values
 *
 * @example // Retrieveing the name and tag of a MutableData:
 * window.safeMutableData.getNameAndTag(mdHandle)
 *  .then((res) => {
 *     console.log("Name:", res.name);
 *     console.log("Tag:", res.tag);
 *  });
 **/
module.exports.getNameAndTag = (mdHandle) => {
  return getObj(mdHandle)
    .then((obj) => obj.netObj.getNameAndTag());
};

/**
 * Look up the MutableData object version on the network
 * @name window.safeMutableData.getVersion
 *
 * @param {MutableDataHandle} mdHandle the MutableData handle
 *
 * @returns {Promise<Number>} current version
 **/
module.exports.getVersion = (mdHandle) => {
  return getObj(mdHandle)
    .then((obj) => obj.netObj.getVersion());
};

/**
 * Look up the value of a specific key
 * @name window.safeMutableData.get
 *
 * @param {MutableDataHandle} mdHandle the MutableData handle
 * @param {String} key the entry's key
 *
 * @returns {Promise<ValueVersion>} the value at the current version
 **/
module.exports.get = (mdHandle, key) => {
  return getObj(mdHandle)
    .then((obj) => obj.netObj.get(key));
};

/**
 * Create/commit this MutableData on the network.
 * @name window.safeMutableData.put
 *
 * @param {MutableDataHandle} mdHandle the MutableData handle
 * @param {PermissionsHandle} permissionsHandle the permissions to create the MutableData with
 * @param {EntriesHandle} entriesHandle data payload to create the MutableData with
 *
 * @returns {Promise} it resolves when finished creating it
 **/
module.exports.put = (mdHandle, permissionsHandle, entriesHandle) => {
  return getObj(mdHandle)
    .then((mdObj) => getObj(permissionsHandle)
      .then((permsObj) => getObj(entriesHandle)
        .then((entriesObj) => mdObj.netObj.put(persObj.netObj, entriesObj.netObj))
      ));
};

/**
 * Get a handle to the entries associated with this MutableData
 * @name window.safeMutableData.getEntries
 *
 * @param {MutableDataHandle} mdHandle the MutableData handle
 *
 * @returns {Promise<EntriesHandle>} the Entries handle
 **/
module.exports.getEntries = (mdHandle) => {
  return getObj(mdHandle)
    .then((obj) => obj.netObj.getEntries()
      .then((entries) => genHandle(obj.app, entries)));
};

/**
 * Get a handle to the keys associated with this MutableData
 * @name window.safeMutableData.getKeys
 *
 * @param {MutableDataHandle} mdHandle the MutableData handle
 *
 * @returns {Promise<KeysHandle>} the Keys handle
 **/
module.exports.getKeys = (mdHandle) => {
  return getObj(mdHandle)
    .then((obj) => obj.netObj.getKeys()
      .then((keys) => genHandle(obj.app, keys)));
};

/**
 * Get a handle to the values associated with this MutableData
 * @name window.safeMutableData.getValues
 *
 * @param {MutableDataHandle} mdHandle the MutableData handle
 *
 * @returns {Promise<ValuesHandle>} the Values handle
 **/
module.exports.getValues = (mdHandle) => {
  return getObj(mdHandle)
    .then((obj) => obj.netObj.getValues()
      .then((values) => genHandle(obj.app, values)));
};

/**
 * Get a handle to the permissions associated with this MutableData
 * @name window.safeMutableData.getPermissions
 *
 * @param {MutableDataHandle} mdHandle the MutableData handle
 *
 * @returns {Promise<PermissionsHandle>} the Permissions handle
 **/
module.exports.getPermissions = (mdHandle) => {
  return getObj(mdHandle)
    .then((obj) => obj.netObj.getPermissions()
      .then((perms) => genHandle(obj.app, perms)));
};

/**
 * Get a handle to the permissions associated with this MutbleData for
 * a specifc key
 * @name window.safeMutableData.getUserPermissions
 *
 * @param {MutableDataHandle} mdHandle the MutableData handle
 * @param {SignKeyHandle} signKeyHandle the sign key to look up
 *
 * @returns {Promise<PermissionsSetHandle>} the PermissionsSet handle
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
 * Requires `'ManagePermissions'` permission for the app.
 * @name window.safeMutableData.delUserPermissions
 *
 * @param {MutableDataHandle} mdHandle the MutableData handle
 * @param {SignKeyHandle} signKeyHandle the sign key to lookup for
 * @param {Number} version the version successor, to confirm you are
 *        actually asking for the right state
 *
 * @returns {Promise} resolves when finished
 **/
module.exports.delUserPermissions = (mdHandle, signKeyHandle, version) => {
  return getObj(signKeyHandle)
    .then((signKeyObj) => getObj(mdHandle)
      .then((mdObj) => mdObj.netObj.delUserPermissions(signKeyObj.netObj, version))
    );
};

/**
 * Set the permissions of a specifc key. Directly commits to the network.
 * Requires `'ManagePermissions'` permission for the app.
 * @name window.safeMutableData.setUserPermissions
 *
 * @param {MutableDataHandle} mdHandle the MutableData handle
 * @param {SignKeyHandle} signKeyHandle the sign key to lookup for
 * @param {PermissionsSetHandle} pmSetHandle the PermissionsSet to set to
 * @param {Number} version the version successor, to confirm you are
 *        actually asking for the right state
 *
 * @returns {Promise} resolves when finished
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
 * Commit the mutations transaction to the network
 * @name window.safeMutableData.applyEntriesMutation
 *
 * @param {MutableDataHandle} mdHandle the MutableData handle
 * @param {MutationHandle} mutationHandle the Mutation you want to apply
 *
 * @returns {Promise} resolves when finished
 **/
module.exports.applyEntriesMutation = (mdHandle, mutationHandle) => {
  return getObj(mutationHandle)
    .then((mutationObj) => getObj(mdHandle)
      .then((mdObj) => mdObj.netObj.applyEntriesMutation(mutationObj.netObj))
    );
};

/**
 * Serialise the current MutableData
 * @name window.safeMutableData.serialise
 *
 * @param {MutableDataHandle} mdHandle the MutableData handle
 *
 * @returns {Promise<String>} the serialised MutableData
 **/
module.exports.serialise = (mdHandle) => {
  return getObj(mdHandle)
    .then((obj) => obj.netObj.serialise());
};

/**
 * Deserialize the MutableData
 * @name window.safeMutableData.fromSerial
 *
 * @param {SAFEAppToken} appToken the app handle
 * @param {String} data the serialised MutableData
 *
 * @returns {Promise<MutableDataHandle>} the MutableData handle
 */
module.exports.fromSerial = (appToken, data) => {
  return getObj(appToken)
    .then((obj) => obj.app.mutableData.fromSerial(data)
      .then((md) => genHandle(obj.app, md)));
};

/**
 * Wrap this MutableData into a known abstraction. Currently known: `NFS`
 * @name window.safeMutableData.emulateAs
 *
 * @param {MutableDataHandle} mdHandle the MutableData handle
 * @param {String} eml name of the emulation
 *
 * @returns {NFSHandle} the NFS emulation you are asking for
 **/
module.exports.emulateAs = (mdHandle, eml) => {
  return getObj(mdHandle)
    .then((obj) => obj.netObj.emulateAs(eml)
      .then((em) => genHandle(obj.app, em)));
};

/**
 * Free the MutableData instance from memory
 * @name window.safeMutableData.free
 *
 * @param {String} mdHandle the MutableData handle
 **/
module.exports.free = (mdHandle) => freeObj(mdHandle);

/**
 * @name MutableDataHandle
 * @typedef {String} MutableDataHandle
 * @description Holds the reference to a MutableData instance.
 * Note that it is required to free the memory used by such an instance when it's
 * not needed anymore by the client aplication, please refer to the `free` function.
 **/
