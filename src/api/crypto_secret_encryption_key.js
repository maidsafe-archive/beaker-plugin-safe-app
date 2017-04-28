const { getObj } = require('./helpers');

module.exports.manifest = {
  getRaw: 'promise',
  decrypt: 'promise'
};

/**
 * Generate raw string copy of encryption key
 * @param appToken - application token
 * @param secEncKeyHandle - secret encrypted key handle
 * @return {Promise<String>}
 */
module.exports.getRaw = (appToken, secEncKeyHandle) => {
  return getObj(appToken)
    .then(() => getObj(secEncKeyHandle))
    .then((secEncKey) => secEncKey.getRaw());
};

/**
 * Decrypt the given ciphertext (buffer or string) using the private and public key
 * @param appToken - application token
 * @param secEncKeyHandle - secret encrypted key handle
 * @param cipher
 * @param theirPubKey
 * @return {Promise<Buffer>}
 */
module.exports.decrypt = (appToken, secEncKeyHandle, cipher, theirPubKey) => {
  return getObj(appToken)
    .then(() => getObj(secEncKeyHandle))
    .then((secEncKey) => secEncKey.decrypt(cipher, theirPubKey));
};
