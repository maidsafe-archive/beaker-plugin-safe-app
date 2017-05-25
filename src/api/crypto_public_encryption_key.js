const { getObj, freeObj } = require('./helpers');

module.exports.manifest = {
  getRaw: 'promise',
  encryptSealed: 'promise',
  encrypt: 'promise',
  free: 'sync'
};

/**
 * Generate raw string copy of public encryption key
 * @name window.safeCryptoPubEncKey.getRaw
 *
 * @param {PubEncKeyHandle} pubEncKeyHandle the PubEncKey handle
 *
 * @returns {Promise<String>} the raw encryption key string
 */
module.exports.getRaw = (pubEncKeyHandle) => {
  return getObj(pubEncKeyHandle)
    .then((obj) => obj.netObj.getRaw());
};

/**
 * Encrypt the input (buffer or string) using the private and public key with a seal
 * @name window.safeCryptoPubEncKey.encryptSealed
 *
 * @param {PubEncKeyHandle} pubEncKeyHandle the PubEncKey handle
 * @param {(String|Buffer)} str the input string to encrypt
 *
 * @returns {Promise<Buffer>} the encrpted data
 */
module.exports.encryptSealed = (pubEncKeyHandle, str) => {
  return getObj(pubEncKeyHandle)
    .then((obj) => obj.netObj.encryptSealed(str));
};

/**
 * Encrypt the input (buffer or string) using the private and public key and the given private key
 * @name window.safeCryptoPubEncKey.encrypt
 *
 * @param {PubEncKeyHandle} pubEncKeyHandle the PubEncKey handle
 * @param {(String|Buffer)} str the input string to encrypt
 * @param {String} secretKey a secrect encryption key string
 *
 * @returns {Promise<Buffer>}
 */
module.exports.encrypt = (pubEncKeyHandle, str, secretKey) => {
  return getObj(pubEncKeyHandle)
    .then((obj) => obj.netObj.encrypt(str, secretKey));
};

/**
 * Free the PubEncKey instance from memory
 * @name window.safeCryptoPubEncKey.free
 *
 * @param {PubEncKeyHandle} pubEncKeyHandle the PubEncKey handle
 **/
module.exports.free = (pubEncKeyHandle) => freeObj(pubEncKeyHandle);

/**
 * @name PubEncKeyHandle
 * @typedef {String} PubEncKeyHandle
 * @description Holds the reference to a PubEncKey instance.
 * Note that it is required to free the memory used by such an instance when it's
 * not needed anymore by the client aplication, please refer to the `free` function.
 **/
