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
 * @returns {Promise<MutableDataHandle>} the MutableData handle
 *
 * @example // Create a PrivateMutable Data with random address:
 * window.safeMutableData.newRandomPrivate(appToken, 15001)
 *    .then((mdHandle) => window.safeMutableData.getNameAndTag(mdHandle))
 *    .then((r) => console.log('New Private MutableData created with tag: ', r.tag, ' and name: ', r.name.buffer));
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
 *
 * @example // Create a PublicMutable Data with random address:
 * window.safeMutableData.newRandomPublic(appToken, 15001)
 *    .then((mdHandle) => window.safeMutableData.getNameAndTag(mdHandle))
 *    .then((r) => console.log('New Public MutableData created with tag: ', r.tag, ' and name: ', r.name.buffer));
 **/
module.exports.newRandomPublic = (appToken, typeTag) => {
  return getObj(appToken)
    .then((obj) => obj.app.mutableData.newRandomPublic(typeTag)
      .then((md) => genHandle(obj.app, md)));
};

/**
 * Initiate a mutuable data at the given address with private
 * access.
 * Note that the nonce can be generated with window.safeCrypto.generateNonce()
 * function.
 * @name window.safeMutableData.newPrivate
 *
 * @param {SAFEAppToken} appToken the app handle
 * @param {(String|Buffer)} name Xor name/address of the MutbleData
 * @param {Number} typeTag the typeTag to use
 * @param {Number} secKey the secret encryption key to use
 * @param {Number} nonce the nonce
 *
 * @returns {Promise<MutableDataHandle>} the MutableData handle
 *
 * @example // Create a PrivateMutable Data with specific address:
 * let name = 'name-private-0101010101010101010';
 * let secKey = 'secret-key-010101010101010101010';
 * window.safeCrypto.generateNonce()
 *    .then((nonce) => window.safeMutableData.newPrivate(appToken, name, 15001, secKey, nonce))
 *    .then((mdHandle) => window.safeMutableData.getNameAndTag(mdHandle))
 *    .then((r) => console.log('New Private MutableData created with tag: ', r.tag, ' and name: ', r.name.buffer));
 **/
module.exports.newPrivate = (appToken, name, typeTag, secKey, nonce) => {
  return getObj(appToken)
    .then((obj) => obj.app.mutableData.newPrivate(name, typeTag, secKey, nonce)
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
 *
 * @example // Create a Public MutableData with specific address:
 * window.safeMutableData.newPublic(appToken, 'name-private-0101010101010101010', 15001)
 *    .then((mdHandle) => window.safeMutableData.getNameAndTag(mdHandle))
 *    .then((r) => console.log('New Public MutableData created with tag: ', r.tag, ' and name: ', r.name.buffer));
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
 *
 * @example
 * window.safeMutableData.newPermissions(appToken)
 *    .then((permsHandle) => console.log('New Permissions created but not committed'));
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
 *
 * @example
 * window.safeMutableData.newPermissionSet(appToken)
 *    .then((permSetHandle) => console.log('New PermissionsSet created but not committed'));
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
 *
 * @example
 * window.safeMutableData.newMutation(appToken)
 *    .then((mutationHandle) => console.log('New Mutation created but not committed'));
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
 *
 * @example
 * window.safeMutableData.newEntries(appToken)
 *    .then((entriesHandle) => console.log('New Entries container created but not committed'));
 **/
module.exports.newEntries = (appToken) => {
  return getObj(appToken)
    .then((obj) => obj.app.mutableData.newEntries()
      .then((entries) => genHandle(obj.app, entries)));
};

/* The following functions act on a MutableData object */

/**
 * Set up a newly (not yet committed/created) MutableData with
 * the app having full-access permissions (and no other).
 * @name window.safeMutableData.quickSetup
 *
 * @param {MutableDataHandle} mdHandle the MutableData handle
 * @param {Object} data a key-value payload it should create the data with
 *
 * @returns {Promise<MutableDataHandle>} the same MutableData handle
 *
 * @example // Create a MutableData and set up its permissions automatically:
 * window.safeMutableData.newPublic(appToken, 15001)
 *    .then((mdHandle) => window.safeMutableData.quickSetup(mdHandle, {key1: 'value1'}))
 *    .then((r) => console.log('New MutableData created and setup'));
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
 *
 * @example // Encrypt an entry's key using Private MutableData's encryption key:
 * window.safeMutableData.encryptKey(mdHandle, 'key1')
 *    .then((encryptedKey) => console.log('Encrypted key: ', encryptedKey));
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
 *
 * @example // Encrypt an entry's value using Private MutableData's encryption key:
 * window.safeMutableData.encryptValue(mdHandle, 'value1')
 *    .then((encryptedValue) => console.log('Encrypted value: ', encryptedValue));
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
 *
 * @example // Encrypt and decrypt an entry's key/value using Private MutableData's encryption key:
 * let encryptedKey, encryptedValue;
 * window.safeMutableData.encryptKey(mdHandle, 'key1')
 *    .then((cipher) => encryptedKey = cipher)
 *    .then(_ => window.safeMutableData.encryptValue(mdHandle, 'value1'))
 *    .then((cipher) => encryptedValue = cipher)
 *    .then(_ => window.safeMutableData.decrypt(mdHandle, encryptedKey))
 *    .then((decryptedKey) => console.log('Decrypted key: ', decryptedKey.toString()))
 *    .then(_ => window.safeMutableData.decrypt(mdHandle, encryptedValue))
 *    .then((decryptedValue) => console.log('Decrypted value: ', decryptedValue.toString()));
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
 *     console.log('Name: ', res.name.buffer);
 *     console.log('Tag: ', res.tag);
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
 *
 * @example // Retrieveing the version of a MutableData:
 * window.safeMutableData.getVersion(mdHandle)
 *  .then((version) => console.log('MutableData current version: ', version));
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
 *
 * @example // Retrieveing the value of an entry:
 * window.safeMutableData.newPublic(appToken, 15001)
 *    .then((mdHandle) => window.safeMutableData.quickSetup(mdHandle, {key1: 'value1'})
 *       .then(_ => window.safeMutableData.get(mdHandle, 'key1'))
 *       .then((value) => {
 *          console.log('Value: ', value.buf.toString());
 *          console.log('Version: ', value.version);
 *       })
 *    );
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
 *
 * @example // Committing a MutableData to the network:
 * let mdHandle, entriesHandle, pmSetHandle, appSignKeyHandle, permissionsHandle;
 * window.safeMutableData.newEntries(appToken)
 *    .then((h) => entriesHandle = h)
 *    .then(_ => window.safeMutableDataEntries.insert(entriesHandle, 'key1', 'value1'))
 *    .then(_ => window.safeCrypto.getAppPubSignKey(appToken))
 *    .then((pk) => appSignKeyHandle = pk)
 *    .then(_ => window.safeMutableData.newPermissionSet(appToken))
 *    .then((h) => pmSetHandle = h)
 *    .then(_ => window.safeMutableDataPermissionsSet.setAllow(pmSetHandle, 'Insert'))
 *    .then(_ => window.safeMutableDataPermissionsSet.setAllow(pmSetHandle, 'ManagePermissions'))
 *    .then(_ => window.safeMutableData.newPermissions(appToken))
 *    .then((h) => permissionsHandle = h)
 *    .then(_ => window.safeMutableDataPermissions.insertPermissionsSet(permissionsHandle, appSignKeyHandle, pmSetHandle))
 *    .then(_ => window.safeMutableData.newRandomPublic(appToken, 15000))
 *    .then((h) => mdHandle = h)
 *    .then(_ => console.log('Finished preparation'))
 *    .then(_ => window.safeMutableData.put(mdHandle, permissionsHandle, entriesHandle))
 *    .then(_ => console.log('Finished creating and committing MutableData to the network'));
 **/
module.exports.put = (mdHandle, permissionsHandle, entriesHandle) => {
  return getObj(mdHandle)
    .then((mdObj) => getObj(permissionsHandle)
      .then((permsObj) => getObj(entriesHandle)
        .then((entriesObj) => mdObj.netObj.put(permsObj.netObj, entriesObj.netObj))
      ));
};

/**
 * Get a handle to the entries associated with this MutableData
 * @name window.safeMutableData.getEntries
 *
 * @param {MutableDataHandle} mdHandle the MutableData handle
 *
 * @returns {Promise<EntriesHandle>} the Entries handle
 *
 * @example // Retrieving the entries:
 * window.safeMutableData.getEntries(mdHandle)
 *    .then((entriesHandle) => window.safeMutableDataEntries.len(entriesHandle))
 *    .then((len) => console.log('Number of entries in the MutableData: ', len));
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
 *
 * @example // Retrieving the keys:
 * window.safeMutableData.getKeys(mdHandle)
 *    .then((keysHandle) => window.safeMutableDataKeys.len(keysHandle))
 *    .then((len) => console.log('Number of keys in the MutableData: ', len));
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
 *
 * @example // Retrieving the values:
 * window.safeMutableData.getValues(mdHandle)
 *    .then((valuesHandle) => window.safeMutableDataValues.len(valuesHandle))
 *    .then((len) => console.log('Number of values in the MutableData: ', len));
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
 *
 * @example // Retrieving the permissions:
 * window.safeMutableData.getPermissions(mdHandle)
 *    .then((permsHandle) => window.safeMutableDataPermissions.len(permsHandle))
 *    .then((len) => console.log('Number of permissions in the MutableData: ', len));
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
 *
 * @example // Retrieving the permissions set associated to a sign key:
 * window.safeMutableData.getUserPermissions(mdHandle, signKey)
 *    .then((permSetHandle) => console.log('PermissionsSet retrieved'));
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
 *
 * @example // Remove the permissions set associated to a sign key:
 * window.safeMutableData.getVersion(mdHandle)
 *    .then((version) => window.safeMutableData.delUserPermissions(mdHandle, signKey, version + 1))
 *    .then(_ => console.log('PermissionsSet removed for the sign key provided'));
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
 *
 * @example // Setting a new permission into a MutableData:
 * let pmSetHandle, appSignKeyHandle;
 * window.safeCrypto.getAppPubSignKey(appToken)
 *    .then((pk) => appSignKeyHandle = pk)
 *    .then(_ => window.safeMutableData.newPermissionSet(appToken))
 *    .then((h) => pmSetHandle = h)
 *    .then(_ => window.safeMutableDataPermissionsSet.setAllow(pmSetHandle, 'Delete'))
 *    .then(_ => window.safeMutableData.getVersion(mdHandle))
 *    .then((version) => window.safeMutableData.setUserPermissions(mdHandle, appSignKeyHandle, pmSetHandle, version + 1))
 *    .then(_ => console.log('Finished setting user permission'));
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
 *
 * @example // Apply an insert mutation to a MutableData:
 * let mutationHandle;
 * window.safeMutableData.newMutation(mdHandle)
 *    .then((h) => mutationHandle = h)
 *    .then(_ => window.safeMutableDataMutation.insert(mutationHandle, 'key1', 'value1'))
 *    .then(_ => window.safeMutableData.applyEntriesMutation(mdHandle, mutationHandle))
 *    .then(_ => console.log('New entry was inserted in the MutableData and committed to the network'));
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
 *
 * @example // Get the serialised version of a MutableData:
 * window.safeMutableData.serialise(mdHandle)
 *    .then((serial) => console.log('MutbleData serialised version retrieved: ', serial));
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
 *
 * @example // Access MutableData information from its serialised version:
 * window.safeMutableData.serialise(mdHandle)
 *    .then((serial) => window.safeMutableData.fromSerial(appToken, serial))
 *       .then((mdHdl) => window.safeMutableData.get(mdHdl, 'key1'))
 *       .then((value) => {
 *          console.log('Value: ', value.buf.toString());
 *          console.log('Version: ', value.version);
 *       });
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
 *
 * @example // Access a MutableData using NFS emulation:
 * window.safeMutableData.emulateAs(mdHandle, 'NFS')
 *    .then((nfsHandle) => window.safeNfs.fetch(nfsHandle, 'file.txt'))
 *    .then((idHdl) => console.log('ImmutableData behind `file.txt` fetched'));
 **/
module.exports.emulateAs = (mdHandle, eml) => {
  return getObj(mdHandle)
    .then((obj) => genHandle(obj.app, obj.netObj.emulateAs(eml)));
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
