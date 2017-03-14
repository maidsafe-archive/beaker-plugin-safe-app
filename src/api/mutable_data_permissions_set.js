const {genHandle, getObj} = require('./handles');

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
  return getObj(appToken)
          .then((app) => getObj(permissionsSetHandle))
          .then((pmSet) => pmSet.setAllow(action));
}

/**
* Set the action as denied
* @param {String} appToken - the application token
* @param {PermissionsSetHandle} permissionsSetHandle - the PermissionsSet obj handle
* @param {MDataAction} action
* @returns {Promise}
**/
module.exports.setDeny = (appToken, permissionsSetHandle, action) => {
  return getObj(appToken)
          .then((app) => getObj(permissionsSetHandle))
          .then((pmSet) => pmSet.setDeny(action));
}

/**
* Remove action from the set
* @param {String} appToken - the application token
* @param {PermissionsSetHandle} permissionsSetHandle - the PermissionsSet obj handle
* @param {MDataAction} action
* @returns {Promise}
**/
module.exports.clear = (appToken, permissionsSetHandle, action) => {
  return getObj(appToken)
          .then((app) => getObj(permissionsSetHandle))
          .then((pmSet) => pmSet.clear(action));
}
