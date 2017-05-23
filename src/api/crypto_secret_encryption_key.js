const { getObj, freeObj } = require('./helpers');

module.exports.manifest = {
  getRaw: 'promise',
  decrypt: 'promise',
  free: 'sync'
};

/**
 * Generate raw string copy of encryption key
 * @param secEncKeyHandle - secret encrypted key handle
 * @return {Promise<String>}
 */
module.exports.getRaw = (secEncKeyHandle) => {
  return getObj(secEncKeyHandle)
    .then((obj) => obj.netObj.getRaw());
};

/**
 * Decrypt the given ciphertext (buffer or string) using the private and public key
 * @param appToken - application token
 * @param secEncKeyHandle - secret encrypted key handle
 * @param cipher
 * @param theirPubKey
 * @return {Promise<Buffer>}
 */
module.exports.decrypt = (secEncKeyHandle, cipher, theirPubKey) => {
  return getObj(secEncKeyHandle)
    .then((obj) => obj.netObj.decrypt(cipher, theirPubKey));
};

/**
 * Free the SecEncKey instance from memory
 * @param {String} secEncKeyHandle - the secret encryption key handle
 */
module.exports.free = (secEncKeyHandle) => freeObj(secEncKeyHandle);
