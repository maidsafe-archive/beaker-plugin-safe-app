const safe_app = require('safe-app');
const addObjToMap = require('./helpers').addObjToMap;
var appTokens = require('./app_tokens');

var permissions_set_handles = new Map();

module.exports.newPermissionsSetObj = (permissions_set) => addObjToMap(permissions_set_handles, permissions_set);

module.exports.manifest = {
  setAllow: 'promise',
  setDeny: 'promise',
  clear: 'promise',
};

/**
* Set the action as allowed
* @param {String} appToken - the application token
* @param {PermissionsSetHandle} permissionsSetHandle - the PermissionsSet obj handle
* @param {MDataAction} action
* @returns {Promise}
**/
module.exports.setAllow = (appToken, permissionsSetHandle, action) => {
  return appTokens.getApp(appToken)
          .then((app) => permissions_set_handles.get(permissionsSetHandle).setAllow(action));
}

/**
* Set the action as denied
* @param {String} appToken - the application token
* @param {PermissionsSetHandle} permissionsSetHandle - the PermissionsSet obj handle
* @param {MDataAction} action
* @returns {Promise}
**/
module.exports.setDeny = (appToken, permissionsSetHandle, action) => {
  return appTokens.getApp(appToken)
          .then((app) => permissions_set_handles.get(permissionsSetHandle).setDeny(action));
}

/**
* Remove action from the set
* @param {String} appToken - the application token
* @param {PermissionsSetHandle} permissionsSetHandle - the PermissionsSet obj handle
* @param {MDataAction} action
* @returns {Promise}
**/
module.exports.clear = (appToken, permissionsSetHandle, action) => {
  return appTokens.getApp(appToken)
          .then((app) => permissions_set_handles.get(permissionsSetHandle).clear(action));
}
