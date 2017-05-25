const { getObj, freeObj } = require('./helpers');

module.exports.manifest = {
  insert: 'promise',
  remove: 'promise',
  update: 'promise',
  free: 'sync'
};

/**
 * @typedef {String} MutationHandle
 * @description Holds the reference to a Mutation instance.
 * Note that it is required to free the memory used by such an instance when it's
 * not needed anymore by the client aplication, please refer to the `free` function.
 **/

/**
 * Store a new `Insert`-action in the transaction.
 *
 * @param {MutationHandle} mutationHandle the Mutation handle
 * @param {(String|Buffer)} keyName
 * @param {(String|Buffer)} value
 *
 * @returns {Promise} resolves once the storing is done
 **/
module.exports.insert = (mutationHandle, keyName, value) => {
  return getObj(mutationHandle)
    .then((obj) => obj.netObj.insert(keyName, value));
};

/**
 * Store a new `Remove`-action in the transaction
 *
 * @param {MutationHandle} mutationHandle the Mutation handle
 * @param {(String|Buffer)} keyName the key of the entry you want to remove
 * @param {Number} version the version successor, to confirm you are
 *        actually asking for the right state
 *
 * @returns {Promise} resolves once the storing is done
 **/
module.exports.remove = (mutationHandle, keyName, version) => {
  return getObj(mutationHandle)
    .then((obj) => obj.netObj.remove(keyName, version));
};

/**
 * Store a `Update`-action in the transaction
 *
 * @param {MutationHandle} mutationHandle the Mutation handle
 * @param {(String|Buffer)} keyName the key of the entry you want to update
 * @param {(String|Buffer)} value the value to upate to
 * @param {Number} version the version successor, to confirm you are
 *        actually asking for the right state
 *
 * @returns {Promise} resolves once the storing is done
 **/
module.exports.update = (mutationHandle, keyName, value, version) => {
  return getObj(mutationHandle)
    .then((obj) => obj.netObj.update(keyName, value, version));
};

/**
 * Free the Mutation instance from memory
 *
 * @param {String} mutationHandle the Mutation handle
 */
module.exports.free = (mutationHandle) => freeObj(mutationHandle);
