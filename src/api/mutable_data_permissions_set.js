const { getObj, freeObj } = require('./helpers');

module.exports.manifest = {
  setAllow: 'promise',
  setDeny: 'promise',
  clear: 'promise',
  free: 'sync'
};

/**
 * Set the action as allowed
 * @param {PermissionsSetHandle} permissionsSetHandle - the PermissionsSet obj handle
 * @param {MDataAction} action
 * @returns {Promise}
 **/
module.exports.setAllow = (permissionsSetHandle, action) => {
  return getObj(permissionsSetHandle)
    .then((obj) => obj.netObj.setAllow(action));
};

/**
 * Set the action as denied
 * @param {PermissionsSetHandle} permissionsSetHandle - the PermissionsSet obj handle
 * @param {MDataAction} action
 * @returns {Promise}
 **/
module.exports.setDeny = (permissionsSetHandle, action) => {
  return getObj(permissionsSetHandle)
    .then((obj) => obj.netObj.setDeny(action));
};

/**
 * Remove action from the set
 * @param {PermissionsSetHandle} permissionsSetHandle - the PermissionsSet obj handle
 * @param {MDataAction} action
 * @returns {Promise}
 **/
module.exports.clear = (permissionsSetHandle, action) => {
  return getObj(permissionsSetHandle)
    .then((obj) => obj.netObj.clear(action));
};

/**
 * Free the PermissionsSet instance from memory
 * @param {String} permissionsSetHandle - the application token
 */
module.exports.free = (permissionsSetHandle) => freeObj(permissionsSetHandle);
