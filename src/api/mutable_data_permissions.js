const safe_app = require('safe-app');
const addObjToMap = require('./helpers').addObjToMap;
const newPermissionsSetObj = require('./mutable_data_permissions_set').newPermissionsSetObj;
var appTokens = require('./app_tokens');

var permissions_handles = new Map();

module.exports.newPermissionsObj = (permissions) => addObjToMap(permissions_handles, permissions);

module.exports.manifest = {
  len: 'promise',
  getPermissionsSet: 'promise',
  insertPermissionsSet: 'promise',
  forEach: 'promise',
};


/**
* Total number of permission entries
* @param {String} appToken - the application token
* @param {PermissionsHandle} permissionsHandle - the Permissions obj handle
* @returns {Promise<Number>}
**/
module.exports.len = (appToken, permissionsHandle) => {
  return appTokens.getApp(appToken)
          .then((app) => permissions_handles.get(permissionsHandle).len());
}

/**
* Lookup the permissions of a specifc key
* @param {String} appToken - the application token
* @param {PermissionsHandle} permissionsHandle - the Permissions obj handle
* @param {SignKey} signKey - the key to lookup for
* @returns {Promise<PermissionsSetHandle>} - the permissions set for that key
**/
module.exports.getPermissionsSet = (appToken, permissionsHandle, signKey) => {
  return appTokens.getApp(appToken)
          .then((app) => permissions_handles.get(permissionsHandle).getPermissionSet(signKey))
          .then(newPermissionsSetObj);
}

/**
* Insert a new permissions to a specifc key. Directly commits to the network.
* Requires 'ManagePermissions'-Permission for the app.
* @param {String} appToken - the application token
* @param {PermissionsHandle} permissionsHandle - the Permissions obj handle
* @param {SignKey} signKey - the key to lookup for
* @param {PermissionsSetHandle} pmset - the permissions set you'd like insert
* @returns {Promise} - once finished
**/
module.exports.insertPermissionsSet = (appToken, permissionsHandle, signKey, pmSetHandle) => {
  return appTokens.getApp(appToken)
          .then((app) => permissions_handles.get(permissionsHandle).insertPermissionSet(signKey, pmSetHandle));
}

/**
* Iterate over the entries, execute the function every time
* @param {String} appToken - the application token
* @param {PermissionsHandle} permissionsHandle - the Permissions obj handle
* @param {function(Buffer, ValueVersion)} fn - the function to call
* @returns {Promise<()>} - resolves once the iteration is done
**/
module.exports.forEach = (appToken, permissionsHandle, fn) => {
  return appTokens.getApp(appToken)
          .then((app) => permissions_handles.get(permissionsHandle).forEach(fn));
}
