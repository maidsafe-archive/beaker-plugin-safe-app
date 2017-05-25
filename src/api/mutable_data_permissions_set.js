const { getObj, freeObj } = require('./helpers');

module.exports.manifest = {
  setAllow: 'promise',
  setDeny: 'promise',
  clear: 'promise',
  free: 'sync'
};

/**
 * @typedef {String} PermissionsSetHandle
 * @description Holds the reference to a PermissionsSet instance.
 * Note that it is required to free the memory used by such an instance when it's
 * not needed anymore by the client aplication, please refer to the `free` function.
 **/

/**
 * Set the action as allowed
 *
 * @param {PermissionsSetHandle} permissionsSetHandle the PermissionsSet handle
 * @param {MDataAction} action the action to set as allowed
 *
 * @returns {Promise} resolves when done
 **/
module.exports.setAllow = (permissionsSetHandle, action) => {
  return getObj(permissionsSetHandle)
    .then((obj) => obj.netObj.setAllow(action));
};

/**
 * Set the action as denied
 *
 * @param {PermissionsSetHandle} permissionsSetHandle the PermissionsSet handle
 * @param {MDataAction} action the action to set as denied
 *
 * @returns {Promise} resolves when done
 **/
module.exports.setDeny = (permissionsSetHandle, action) => {
  return getObj(permissionsSetHandle)
    .then((obj) => obj.netObj.setDeny(action));
};

/**
 * Remove all permissions for a type of action from the set
 *
 * @param {PermissionsSetHandle} permissionsSetHandle the PermissionsSet handle
 * @param {MDataAction} action the action the permissions to be cleared
 *
 * @returns {Promise} resolves when done
 **/
module.exports.clear = (permissionsSetHandle, action) => {
  return getObj(permissionsSetHandle)
    .then((obj) => obj.netObj.clear(action));
};

/**
 * Free the PermissionsSet instance from memory
 *
 * @param {String} permissionsSetHandle the PermissionsSet handle
 */
module.exports.free = (permissionsSetHandle) => freeObj(permissionsSetHandle);
