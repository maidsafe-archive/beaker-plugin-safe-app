const { getObj, freeObj } = require('./helpers');

module.exports.manifest = {
  getRaw: 'promise',
  free: 'sync'
};

/**
 * Generate raw string copy of the public signature key
 * @name window.safeCryptoSignKey.getRaw
 *
 * @param {SignKeyHandle} signKeyHandle the public SignKey handle
 *
 * @returns {Promise<Buffer>} the raw signature key
 *
 * @example // Retrieving a raw string copy of the sign key:
 * window.safeCrypto.getAppPubSignKey(appHandle)
 *    .then((signKeyHandle) => window.safeCryptoSignKey.getRaw(signKeyHandle))
 *    .then((rawPk) => console.log('Sign key: ', rawPk.buffer.toString('hex')));
 */
module.exports.getRaw = (signKeyHandle) => {
  return getObj(signKeyHandle)
    .then((obj) => obj.netObj.getRaw());
};

/**
 * Free the SignKey instance from memory
 * @name window.safeCryptoSignKey.free
 *
 * @param {SignKeyHandle} signKeyHandle the SignKey handle
 **/
module.exports.free = (signKeyHandle) => freeObj(signKeyHandle);

/**
 * @name SignKeyHandle
 * @typedef {String} SignKeyHandle
 * @description Holds the reference to a public SignKey instance.
 * Note that it is required to free the memory used by such an instance when it's
 * not needed anymore by the client aplication, please refer to the `free` function.
 **/
