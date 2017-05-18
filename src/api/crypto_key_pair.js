const { genHandle, getObj, freeObj } = require('./helpers');

module.exports.manifest = {
  getPubEncKey: 'promise',
  getSecEncKey: 'promise',
  decryptSealed: 'promise',
  free: 'sync'
};

/**
 * Get the Public Encryption key instance of this keypair
 * @param appToken - application token
 * @param keyPairHandle - keyPair handle
 * @return {Promise<PubEncKey>}
 */
module.exports.getPubEncKey = (appToken, keyPairHandle) => {
  return getObj(appToken)
    .then(() => getObj(keyPairHandle))
    .then((keyPair) => genHandle(keyPair.pubEncKey));
};

/**
 * Get the Secrect Encryption key instance of this keypair
 * @param appToken - application token
 * @param keyPairHandle - keyPair handle
 * @return {Promise<SecEncKey>}
 */
module.exports.getSecEncKey = (appToken, keyPairHandle) => {
  return getObj(appToken)
    .then(() => getObj(keyPairHandle))
    .then((keyPair) => genHandle(keyPair.secEncKey));
};

/**
 * Decrypt the given ciphertext with a seal (buffer or string) using the private and public key
 * @param appToken - application token
 * @param keyPairHandle - keyPair handle
 * @param cipher
 * @return {Promise<Buffer>}
 */
module.exports.decryptSealed = (appToken, keyPairHandle, cipher) => {
  return getObj(appToken)
    .then(() => getObj(keyPairHandle))
    .then((keyPair) => keyPair.decryptSealed(cipher));
};

/**
 * Free the KeyPair instance from memory
 * @param {String} keyPairHandle - the KeyPair handle
 */
module.exports.free = (keyPairHandle) => freeObj(keyPairHandle);
