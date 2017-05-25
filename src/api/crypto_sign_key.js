const { getObj, freeObj } = require('./helpers');

module.exports.manifest = {
  getRaw: 'promise',
  free: 'sync'
};

/**
 * @typedef {String} SignKeyHandle
 * @description Holds the reference to a public SignKey instance.
 * Note that it is required to free the memory used by such an instance when it's
 * not needed anymore by the client aplication, please refer to the `free` function.
 **/

/**
 * Generate raw string copy of the public signature key
 *
 * @param {SignKeyHandle} signKeyHandle the public SignKey handle
 * @returns {Promise<String>} the raw signature key string
 */
module.exports.getRaw = (signKeyHandle) => {
  return getObj(signKeyHandle)
    .then((obj) => obj.netObj.getRaw());
};

/**
 * Free the SignKey instance from memory
 *
 * @param {SignKeyHandle} signKeyHandle the SignKey handle
 */
module.exports.free = (signKeyHandle) => freeObj(signKeyHandle);
