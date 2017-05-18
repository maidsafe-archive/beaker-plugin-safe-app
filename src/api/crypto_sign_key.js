const { getObj, freeObj } = require('./helpers');

module.exports.manifest = {
  getRaw: 'promise',
  free: 'sync'
};

/**
 * Generate raw string copy of encryption key
 * @param appToken - application token
 * @param signKeyHandle - public encrypted key handle
 * @return {Promise<String>}
 */
module.exports.getRaw = (appToken, signKeyHandle) => {
  return getObj(appToken)
    .then(() => getObj(signKeyHandle))
    .then((signKey) => signKey.getRaw());
};

/**
 * Free the SignKey instance from memory
 * @param {String} signKeyHandle - the SignKey handle
 */
module.exports.free = (signKeyHandle) => freeObj(signKeyHandle);
