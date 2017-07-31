const { getObj, freeObj } = require('./helpers');

module.exports.manifest = {
  setAllow: 'promise',
  setDeny: 'promise',
  clear: 'promise',
  free: 'sync'
};

/**
 * Set the action as allowed
 * @name window.safeMutableDataPermissionsSet.setAllow
 *
 * @param {PermissionsSetHandle} permissionsSetHandle the PermissionsSet handle
 * @param {MDataAction} action the action to set as allowed
 *
 * @returns {Promise} resolves when done
 *
 * @example // Setting a new permission into a MutableData:
 * let pmSetHandle, appSignKeyHandle;
 * window.safeCrypto.getAppPubSignKey(appHandle)
 *    .then((pk) => appSignKeyHandle = pk)
 *    .then(_ => window.safeMutableData.newPermissionSet(appHandle))
 *    .then((h) => pmSetHandle = h)
 *    .then(_ => window.safeMutableDataPermissionsSet.setAllow(pmSetHandle, 'Delete'))
 *    .then(_ => window.safeMutableData.getVersion(mdHandle))
 *    .then((version) => window.safeMutableData.setUserPermissions(mdHandle, appSignKeyHandle, pmSetHandle, version + 1))
 *    .then(_ => console.log('Finished setting user permission'));
 **/
module.exports.setAllow = (permissionsSetHandle, action) => {
  return getObj(permissionsSetHandle)
    .then((obj) => obj.netObj.setAllow(action));
};

/**
 * Set the action as denied
 * @name window.safeMutableDataPermissionsSet.setDeny
 *
 * @param {PermissionsSetHandle} permissionsSetHandle the PermissionsSet handle
 * @param {MDataAction} action the action to set as denied
 *
 * @returns {Promise} resolves when done
 *
 * @example // Setting a new permission into a MutableData:
 * let pmSetHandle, appSignKeyHandle;
 * window.safeCrypto.getAppPubSignKey(appHandle)
 *    .then((pk) => appSignKeyHandle = pk)
 *    .then(_ => window.safeMutableData.newPermissionSet(appHandle))
 *    .then((h) => pmSetHandle = h)
 *    .then(_ => window.safeMutableDataPermissionsSet.setDeny(pmSetHandle, 'Update'))
 *    .then(_ => window.safeMutableData.getVersion(mdHandle))
 *    .then((version) => window.safeMutableData.setUserPermissions(mdHandle, appSignKeyHandle, pmSetHandle, version + 1))
 *    .then(_ => console.log('Finished setting user permission'));
 **/
module.exports.setDeny = (permissionsSetHandle, action) => {
  return getObj(permissionsSetHandle)
    .then((obj) => obj.netObj.setDeny(action));
};

/**
 * Remove all permissions for a type of action from the set
 * @name window.safeMutableDataPermissionsSet.clear
 *
 * @param {PermissionsSetHandle} permissionsSetHandle the PermissionsSet handle
 * @param {MDataAction} action the action the permissions to be cleared
 *
 * @returns {Promise} resolves when done
 *
 * @example // Setting a new permission into a MutableData:
 * let pmSetHandle, appSignKeyHandle;
 * window.safeCrypto.getAppPubSignKey(appHandle)
 *    .then((pk) => appSignKeyHandle = pk)
 *    .then(_ => window.safeMutableData.newPermissionSet(appHandle))
 *    .then((h) => pmSetHandle = h)
 *    .then(_ => window.safeMutableDataPermissionsSet.clear(pmSetHandle, 'Insert'))
 *    .then(_ => window.safeMutableData.getVersion(mdHandle))
 *    .then((version) => window.safeMutableData.setUserPermissions(mdHandle, appSignKeyHandle, pmSetHandle, version + 1))
 *    .then(_ => console.log('Finished setting user permission'));
 **/
module.exports.clear = (permissionsSetHandle, action) => {
  return getObj(permissionsSetHandle)
    .then((obj) => obj.netObj.clear(action));
};

/**
 * Free the PermissionsSet instance from memory
 * @name window.safeMutableDataPermissionsSet.free
 *
 * @param {String} permissionsSetHandle the PermissionsSet handle
 **/
module.exports.free = (permissionsSetHandle) => freeObj(permissionsSetHandle);

/**
 * @name PermissionsSetHandle
 * @typedef {String} PermissionsSetHandle
 * @description Holds the reference to a PermissionsSet instance.
 * Note that it is required to free the memory used by such an instance when it's
 * not needed anymore by the client aplication, please refer to the `free` function.
 **/
