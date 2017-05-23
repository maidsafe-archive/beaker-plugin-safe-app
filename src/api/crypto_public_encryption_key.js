const { getObj, freeObj } = require('./helpers');

module.exports.manifest = {
  getRaw: 'promise',
  encryptSealed: 'promise',
  encrypt: 'promise',
  free: 'sync'
};

/**
 * Generate raw string copy of encryption key
 * @param pubEncKeyHandle - public encrypted key handle
 * @return {Promise<String>}
 */
module.exports.getRaw = (pubEncKeyHandle) => {
  return getObj(pubEncKeyHandle)
    .then((obj) => obj.netObj.getRaw());
};

/**
 * Encrypt the input (buffer or string) using the private and public key with a seal
 * @param pubEncKeyHandle - public encrypted key handle
 * @param str
 * @return {Promise<Buffer>}
 */
module.exports.encryptSealed = (pubEncKeyHandle, str) => {
  return getObj(pubEncKeyHandle)
    .then((obj) => obj.netObj.encryptSealed(str));
};

/**
 * Encrypt the input (buffer or string) using the private and public key and the given privateKey
 * @param pubEncKeyHandle - public encrypted key handle
 * @param str
 * @param secretKey
 * @return {Promise<Buffer>}
 */
module.exports.encrypt = (pubEncKeyHandle, str, secretKey) => {
  return getObj(pubEncKeyHandle)
    .then((obj) => obj.netObj.encrypt(str, secretKey));
};

/**
 * Free the PubEncKey instance from memory
 * @param {String} pubEncKeyHandle - the public encryption key handle
 */
module.exports.free = (pubEncKeyHandle) => freeObj(pubEncKeyHandle);
