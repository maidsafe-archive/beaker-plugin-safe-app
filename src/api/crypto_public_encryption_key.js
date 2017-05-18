const { getObj, freeObj } = require('./helpers');

module.exports.manifest = {
  getRaw: 'promise',
  encryptSealed: 'promise',
  encrypt: 'promise',
  free: 'sync'
};

/**
 * Generate raw string copy of encryption key
 * @param appToken - application token
 * @param pubEncKeyHandle - public encrypted key handle
 * @return {Promise<String>}
 */
module.exports.getRaw = (appToken, pubEncKeyHandle) => {
  return getObj(appToken)
    .then(() => getObj(pubEncKeyHandle))
    .then((pubEncKey) => pubEncKey.getRaw());
};

/**
 * Encrypt the input (buffer or string) using the private and public key with a seal
 * @param appToken - application token
 * @param pubEncKeyHandle - public encrypted key handle
 * @param str
 * @return {Promise<Buffer>}
 */
module.exports.encryptSealed = (appToken, pubEncKeyHandle, str) => {
  return getObj(appToken)
    .then(() => getObj(pubEncKeyHandle))
    .then((pubEncKey) => pubEncKey.encryptSealed(str));
};

/**
 * Encrypt the input (buffer or string) using the private and public key and the given privateKey
 * @param appToken - application token
 * @param pubEncKeyHandle - public encrypted key handle
 * @param str
 * @param secretKey
 * @return {Promise<Buffer>}
 */
module.exports.encrypt = (appToken, pubEncKeyHandle, str, secretKey) => {
  return getObj(appToken)
    .then(() => getObj(pubEncKeyHandle))
    .then((pubEncKey) => pubEncKey.encrypt(str, secretKey));
};

/**
 * Free the PubEncKey instance from memory
 * @param {String} pubEncKeyHandle - the public encryption key handle
 */
module.exports.free = (pubEncKeyHandle) => freeObj(pubEncKeyHandle);
