const safe_app = require('safe-app');
const addObjToMap = require('./helpers').addObjToMap;
var appTokens = require('./app_tokens');

var mutation_handles = new Map();

module.exports.newMutationObj = (mutation) => addObjToMap(mutation_handles, mutation);

module.exports.manifest = {
  insert: 'promise',
  remove: 'promise',
  update: 'promise',
};

/**
* Store a new `Insert`-Action in the transaction.
*
* @param {String} appToken - the application token
* @param {MutationHandle} mutationHandle - the Mutation obj handle
* @param {(String|Buffer)} keyName
* @param {(String|Buffer)} value
* @returns {Promise} resolves once the storing is done
**/
module.exports.insert = (appToken, mutationHandle, keyName, value) => {
  return appTokens.getApp(appToken)
          .then((app) => mutation_handles.get(mutationHandle).insert(keyName, value));
}

/**
* Store a new `Remove`-Action in the transaction
*
* @param {String} appToken - the application token
* @param {MutationHandle} mutationHandle - the Mutation obj handle
* @param {(String|Buffer)} keyName - the key you want to remove
* @param {Number} version - the current version, to confirm you are
*        actually asking for the right state
* @returns {Promise} resolves once the storing is done
**/
module.exports.remove = (appToken, mutationHandle, keyName, version) => {
  return appTokens.getApp(appToken)
          .then((app) => mutation_handles.get(mutationHandle).remove(keyName, version));
}

/**
* Store a `Update`-Action in the transaction
*
* @param {String} appToken - the application token
* @param {MutationHandle} mutationHandle - the Mutation obj handle
* @param {(String|Buffer)} keyName - the key you want to remove
* @param {(String|Buffer)} value - the value to upate to
* @param {Number} version - the current version, to confirm you are
*        actually asking for the right state
* @returns {Promise} resolves once the storing is done
**/
module.exports.update = (appToken, mutationHandle, keyName, value, version) => {
  return appTokens.getApp(appToken)
          .then((app) => mutation_handles.get(mutationHandle).update(keyName, value, version));
}
