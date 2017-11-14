const { getObj } = require('./helpers');

module.exports.manifest = {
  getRaw: 'promise',
  sign: 'promise'
};

/**
 * Generate raw string copy of the secret sign key
 * @name window.safeCryptoSecSignKey.getRaw
 *
 * @param {SecSignKeyHandle} secSignKeyHandle
 *
 * @returns {Promise<Buffer>} the raw secret sign key
 *
 * @example // Retrieving a raw string copy of the sign key:
 * window.safeCrypto.getAppSecSignKey(appHandle)
 *    .then((secSignKeyHandle) => window.safeCryptoSecSignKey.getRaw(secSignKeyHandle))
 *    .then((rawSk) => console.log('Raw secret sign key: ', rawSk.buffer.toString('hex')));
 */
module.exports.getRaw = (secSignKeyHandle) => {
  return getObj(secSignKeyHandle)
    .then((obj) => obj.netObj.getRaw());
};

/**
 * Sign the given data (buffer or string) using the secret sign key
 * @name window.safeCryptoSecSignKey.sign
 *
 * @param {SecSignKeyHandle} secSignKeyHandle
 *
 * @returns {Promise<Buffer>} verified data
 */
module.exports.sign = (secSignKeyHandle, data) => {
  return getObj(secSignKeyHandle)
    .then((obj) => obj.netObj.sign(data));
};
