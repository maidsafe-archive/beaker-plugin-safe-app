const { genHandle, getObj, freeObj, forEachHelper } = require('./helpers');

module.exports.manifest = {
  len: 'promise',
  getPermissionsSet: 'promise',
  insertPermissionsSet: 'promise',
  _with_cb_forEach: 'readable',
  free: 'sync'
};

/**
 * @typedef {String} PermissionsHandle
 * @description Holds the reference to a Permissions instance.
 * Note that it is required to free the memory used by such an instance when it's
 * not needed anymore by the client aplication, please refer to the `free` function.
 **/

/**
 * Total number of permissions entries
 *
 * @param {PermissionsHandle} permissionsHandle the Permissions handle
 *
 * @returns {Promise<Number>} the number of permissions entries
 **/
module.exports.len = (permissionsHandle) => {
  return getObj(permissionsHandle)
    .then((obj) => obj.netObj.len());
};

/**
 * Lookup the permissions of a specifc key
 *
 * @param {PermissionsHandle} permissionsHandle the Permissions handle
 * @param {SignKeyHandle} signKeyHandle the sign key to lookup for
 *
 * @returns {Promise<PermissionsSetHandle>} the permissions set for that sign key
 **/
module.exports.getPermissionsSet = (permissionsHandle, signKeyHandle) => {
  return getObj(signKeyHandle)
    .then((signKeyObj) => getObj(permissionsHandle)
      .then((permsObj) => permsObj.netObj.getPermissionSet(signKeyObj.netObj)
        .then((permSet) => genHandle(permsObj.app)))
    );
};

/**
 * Insert a new permissions to a specifc sign key. Directly commits to the network.
 * Requires 'ManagePermissions'-permission for the app.
 *
 * @param {PermissionsHandle} permissionsHandle the Permissions handle
 * @param {SignKeyHandle} signKeyHandle the sign key to lookup for
 * @param {PermissionsSetHandle} pmSetHandle - the permissions set you'd like insert
 *
 * @returns {Promise} resolves once finished
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
 *
 * @param {PermissionsHandle} permissionsHandle the Permissions handle
 * @param {function(Buffer, ValueVersion)} fn the function to call
 *
 * @returns {Promise} resolves once the iteration is finished
 **/
module.exports._with_cb_forEach = (permissionsHandle) => {
  return forEachHelper(permissionsHandle, true);
};

/**
 * Free the Permissions instance from memory
 *
 * @param {String} permissionsHandle the Permissions handle
 */
module.exports.free = (permissionsHandle) => freeObj(permissionsHandle);
