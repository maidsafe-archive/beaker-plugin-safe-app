const { genHandle, getObj, freeObj, forEachHelper } = require('./helpers');

module.exports.manifest = {
  len: 'promise',
  getPermissionsSet: 'promise',
  insertPermissionsSet: 'promise',
  _with_cb_forEach: 'readable',
  free: 'sync'
};

/**
 * Total number of permission entries
 * @param {PermissionsHandle} permissionsHandle - the Permissions obj handle
 * @returns {Promise<Number>}
 **/
module.exports.len = (permissionsHandle) => {
  return getObj(permissionsHandle)
    .then((obj) => obj.netObj.len());
};

/**
 * Lookup the permissions of a specifc key
 * @param {PermissionsHandle} permissionsHandle - the Permissions obj handle
 * @param {SignKeyHandle} signKeyHandle - the key to lookup for
 * @returns {Promise<PermissionsSetHandle>} - the permissions set for that key
 **/
module.exports.getPermissionsSet = (permissionsHandle, signKeyHandle) => {
  return getObj(signKeyHandle)
    .then((signKeyObj) => getObj(permissionsHandle)
      .then((permsObj) => permsObj.netObj.getPermissionSet(signKeyObj.netObj)
        .then((permSet) => genHandle(permsObj.app)))
    );
};

/**
 * Insert a new permissions to a specifc key. Directly commits to the network.
 * Requires 'ManagePermissions'-Permission for the app.
 * @param {PermissionsHandle} permissionsHandle - the Permissions obj handle
 * @param {SignKeyHandle} signKeyHandle - the key to lookup for
 * @param {PermissionsSetHandle} pmSetHandle - the permissions set you'd like insert
 * @returns {Promise} - once finished
 **/
module.exports.insertPermissionsSet = (permissionsHandle, signKeyHandle, pmSetHandle) => {
  return getObj(signKeyHandle)
    .then((signKeyObj) => getObj(pmSetHandle)
      .then((pmSetObj) => getObj(permissionsHandle)
        .then((permsObj) => permsObj.netObj.insertPermissionSet(signKeyObj.netObj, pmSetObj.netObj))
      ));
};

/**
 * Iterate over the entries, execute the function every time
 * @param {PermissionsHandle} permissionsHandle - the Permissions obj handle
 * @param {function(Buffer, ValueVersion)} fn - the function to call
 * @returns {Promise<()>} - resolves once the iteration is done
 **/
module.exports._with_cb_forEach = (permissionsHandle) => {
  return forEachHelper(permissionsHandle, true);
};

/**
 * Free the Permissions instance from memory
 * @param {String} permissionsHandle - the application token
 */
module.exports.free = (permissionsHandle) => freeObj(permissionsHandle);
