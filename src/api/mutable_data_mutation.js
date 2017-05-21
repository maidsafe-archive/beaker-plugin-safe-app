const { getObj, freeObj } = require('./helpers');

module.exports.manifest = {
  insert: 'promise',
  remove: 'promise',
  update: 'promise',
  free: 'sync'
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
  return getObj(appToken)
    .then(() => getObj(mutationHandle))
    .then((mutation) => mutation.insert(keyName, value));
};

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
  return getObj(appToken)
    .then(() => getObj(mutationHandle))
    .then((mutation) => mutation.remove(keyName, version));
};

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
  return getObj(appToken)
    .then(() => getObj(mutationHandle))
    .then((mutation) => mutation.update(keyName, value, version));
};

/**
 * Free the Mutation instance from memory
 * @param {String} mutationHandle - the application token
 */
module.exports.free = (mutationHandle) => freeObj(mutationHandle);
