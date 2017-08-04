const { getObj, freeObj } = require('./helpers');

module.exports.manifest = {
  getRaw: 'promise',
  decrypt: 'promise',
  free: 'sync'
};

/**
 * Generate raw string copy of the secret encryption key
 * @name window.safeCryptoSecEncKey.getRaw
 *
 * @param {SecEncKeyHandle} secEncKeyHandle the SecEncKey handle
 *
 * @returns {Promise<String>} the raw secret encryption key string
 *
 * @example // Generating a raw string copy of the secret encryption key:
 * window.safeCrypto.generateEncKeyPair(appHandle)
 *    .then((encKeyPairHandle) => window.safeCryptoKeyPair.getSecEncKey(encKeyPairHandle))
 *    .then((secEncKeyHandle) => window.safeCryptoSecEncKey.getRaw(secEncKeyHandle))
 *    .then((rawSk) => console.log('Secret encryption key: ', rawSk.buffer.toString('hex')));
 */
module.exports.getRaw = (secEncKeyHandle) => {
  return getObj(secEncKeyHandle)
    .then((obj) => obj.netObj.getRaw());
};

/**
 * Decrypt the given ciphertext (buffer or string) using the private and public key
 * @name window.safeCryptoSecEncKey.decrypt
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
 * @name window.safeCryptoSecEncKey.free
 *
 * @param {SecEncKeyHandle} secEncKeyHandle the SecEncKey handle
 **/
module.exports.free = (secEncKeyHandle) => freeObj(secEncKeyHandle);

/**
 * @name SecEncKeyHandle
 * @typedef {String} SecEncKeyHandle
 * @description Holds the reference to a SecEncKey instance.
 * Note that it is required to free the memory used by such an instance when it's
 * not needed anymore by the client aplication, please refer to the `free` function.
 **/
