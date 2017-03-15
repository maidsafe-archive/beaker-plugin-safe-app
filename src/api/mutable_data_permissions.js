const {genHandle, getObj} = require('./handles');

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
  return getObj(appToken)
          .then((app) => getObj(permissionsHandle))
          .then((permissions) => permissions.len());
}

/**
* Lookup the permissions of a specifc key
* @param {String} appToken - the application token
* @param {PermissionsHandle} permissionsHandle - the Permissions obj handle
* @param {SignKeyHandle} signKeyHandle - the key to lookup for
* @returns {Promise<PermissionsSetHandle>} - the permissions set for that key
**/
module.exports.getPermissionsSet = (appToken, permissionsHandle, signKeyHandle) => {
  return getObj(appToken)
          .then((app) => getObj(signKeyHandle))
          .then((signKey) => getObj(permissionsHandle)
            .then((permissions) => permissions.getPermissionSet(signKey))
            .then(genHandle)
          );
}

/**
* Insert a new permissions to a specifc key. Directly commits to the network.
* Requires 'ManagePermissions'-Permission for the app.
* @param {String} appToken - the application token
* @param {PermissionsHandle} permissionsHandle - the Permissions obj handle
* @param {SignKeyHandle} signKeyHandle - the key to lookup for
* @param {PermissionsSetHandle} pmSetHandle - the permissions set you'd like insert
* @returns {Promise} - once finished
**/
module.exports.insertPermissionsSet = (appToken, permissionsHandle, signKeyHandle, pmSetHandle) => {
  return getObj(appToken)
          .then((app) => getObj(signKeyHandle))
          .then((signKey) => getObj(pmSetHandle)
            .then((pmSet) => getObj(permissionsHandle)
              .then((permissions) => permissions.insertPermissionSet(signKey, pmSet))
            ));
}

/**
* Iterate over the entries, execute the function every time
* @param {String} appToken - the application token
* @param {PermissionsHandle} permissionsHandle - the Permissions obj handle
* @param {function(Buffer, ValueVersion)} fn - the function to call
* @returns {Promise<()>} - resolves once the iteration is done
**/
module.exports.forEach = (appToken, permissionsHandle, fn) => {
  return getObj(appToken)
          .then((app) => getObj(permissionsHandle))
          .then((permissions) => permissions.forEach(fn));
}
