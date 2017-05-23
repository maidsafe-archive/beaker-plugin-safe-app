const { getObj, freeObj } = require('./helpers');

module.exports.manifest = {
  getRaw: 'promise',
  free: 'sync'
};

/**
 * Generate raw string copy of encryption key
 * @param signKeyHandle - public encrypted key handle
 * @return {Promise<String>}
 */
module.exports.getRaw = (signKeyHandle) => {
  return getObj(signKeyHandle)
    .then((obj) => obj.netObj.getRaw());
};

/**
 * Free the SignKey instance from memory
 * @param {String} signKeyHandle - the SignKey handle
 */
module.exports.free = (signKeyHandle) => freeObj(signKeyHandle);
