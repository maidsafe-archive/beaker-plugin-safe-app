const { getObj, freeObj } = require('./helpers');

module.exports.manifest = {
  getRaw: 'promise',
  decrypt: 'promise',
  free: 'sync'
};

/**
 * @typedef {String} SecEncKeyHandle
 * @description Holds the reference to a SecEncKey instance.
 * Note that it is required to free the memory used by such an instance when it's
 * not needed anymore by the client aplication, please refer to the `free` function.
 **/

/**
 * Generate raw string copy of the secret encryption key
 *
 * @param {SecEncKeyHandle} secEncKeyHandle the SecEncKey handle
 *
 * @returns {Promise<String>} the raw secret encryption key string
 */
module.exports.getRaw = (secEncKeyHandle) => {
  return getObj(secEncKeyHandle)
    .then((obj) => obj.netObj.getRaw());
};

/**
 * Decrypt the given ciphertext (buffer or string) using the private and public key
 *
 * @param {SecEncKeyHandle} secEncKeyHandle secret encryption key handle
 * @param {(String|Buffer)} cipher the cipher text
 * @param {String} theirPubKey a public key
 *
 * @returns {Promise<Buffer>} the decrypted data
 */
module.exports.decrypt = (secEncKeyHandle, cipher, theirPubKey) => {
  return getObj(secEncKeyHandle)
    .then((obj) => obj.netObj.decrypt(cipher, theirPubKey));
};

/**
 * Free the SecEncKey instance from memory
 *
 * @param {SecEncKeyHandle} secEncKeyHandle the SecEncKey handle
 */
module.exports.free = (secEncKeyHandle) => freeObj(secEncKeyHandle);
