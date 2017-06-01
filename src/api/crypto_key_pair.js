const { genHandle, getObj, freeObj } = require('./helpers');

module.exports.manifest = {
  getPubEncKey: 'promise',
  getSecEncKey: 'promise',
  decryptSealed: 'promise',
  free: 'sync'
};

/**
 * Get the Public Encryption Key instance of this key pair
 * @name window.safeCryptoKeyPair.getPubEncKey
 *
 * @param {KeyPairHandle} keyPairHandle the KeyPair handle
 *
 * @returns {Promise<PubEncKeyHandle>} the PubEncKey handle
 */
module.exports.getPubEncKey = (keyPairHandle) => {
  return getObj(keyPairHandle)
    .then((obj) => genHandle(obj.app, obj.netObj.pubEncKey));
};

/**
 * Get the Secrect Encryption Key instance of this key pair
 * @name window.safeCryptoKeyPair.getSecEncKey
 *
 * @param {KeyPairHandle} keyPairHandle the KeyPair handle
 *
 * @returns {Promise<SecEncKeyHandle>} the SecEncKey handle
 */
module.exports.getSecEncKey = (keyPairHandle) => {
  return getObj(keyPairHandle)
    .then((obj) => genHandle(obj.app, obj.netObj.secEncKey));
};

/**
 * Decrypt the given ciphertext with a seal (buffer or string) using the private and public key
 * @name window.safeCryptoKeyPair.decryptSealed
 *
 * @param {KeyPairHandle} keyPairHandle the KeyPair handle
 * @param {(String|Buffer)} cipher the chiper text to decrypt
 *
 * @returns {Promise<Buffer>} the decrypted data
 */
module.exports.decryptSealed = (keyPairHandle, cipher) => {
  return getObj(keyPairHandle)
    .then((obj) => obj.netObj.decryptSealed(cipher));
};

/**
 * Free the KeyPair instance from memory
 * @name window.safeCryptoKeyPair.free
 *
 * @param {KeyPairHandle} keyPairHandle the KeyPair handle
 **/
module.exports.free = (keyPairHandle) => freeObj(keyPairHandle);

/**
 * @name KeyPairHandle
 * @typedef {String} KeyPairHandle
 * @description Holds the reference to a KeyPair instance.
 * Note that it is required to free the memory used by such an instance when it's
 * not needed anymore by the client aplication, please refer to the `free` function.
 **/
