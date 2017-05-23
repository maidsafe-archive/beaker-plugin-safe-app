const { genHandle, getObj, freeObj } = require('./helpers');

module.exports.manifest = {
  getPubEncKey: 'promise',
  getSecEncKey: 'promise',
  decryptSealed: 'promise',
  free: 'sync'
};

/**
 * Get the Public Encryption key instance of this keypair
 * @param keyPairHandle - keyPair handle
 * @return {Promise<PubEncKey>}
 */
module.exports.getPubEncKey = (keyPairHandle) => {
  return getObj(keyPairHandle)
    .then((obj) => genHandle(obj.netObj.pubEncKey));
};

/**
 * Get the Secrect Encryption key instance of this keypair
 * @param keyPairHandle - keyPair handle
 * @return {Promise<SecEncKey>}
 */
module.exports.getSecEncKey = (keyPairHandle) => {
  return getObj(keyPairHandle)
    .then((obj) => genHandle(obj.netObj.secEncKey));
};

/**
 * Decrypt the given ciphertext with a seal (buffer or string) using the private and public key
 * @param keyPairHandle - keyPair handle
 * @param cipher
 * @return {Promise<Buffer>}
 */
module.exports.decryptSealed = (keyPairHandle, cipher) => {
  return getObj(keyPairHandle)
    .then((obj) => obj.netObj.decryptSealed(cipher));
};

/**
 * Free the KeyPair instance from memory
 * @param {String} keyPairHandle - the KeyPair handle
 */
module.exports.free = (keyPairHandle) => freeObj(keyPairHandle);
