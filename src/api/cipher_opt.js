const { genHandle, getObj, freeObj } = require('./helpers');

module.exports.manifest = {
  newPlainText: 'promise',
  newSymmetric: 'promise',
  newAsymmetric: 'promise',
  free: 'sync'
};

/**
 * Create a PlainText Cipher Opt
 * @param {SAFEAppToken} appToken the app handle
 * @returns {CipherOptHandle}
 **/
module.exports.newPlainText = (appToken) => {
  return getObj(appToken)
    .then((obj) => obj.app.cipherOpt.newPlainText()
      .then((cipherOpt) => genHandle(obj.app, cipherOpt)));
};

/**
 * Create a new Symmetric Cipher
 * @param {SAFEAppToken} appToken the app handle
 * @returns {CipherOptHandle}
 **/
module.exports.newSymmetric = (appToken) => {
  return getObj(appToken)
    .then((obj) => obj.app.cipherOpt.newSymmetric()
      .then((cipherOpt) => genHandle(obj.app, cipherOpt)));
};

/**
 * Create a new Asymmetric Cipher for the given key
 * @param {EncKeyHandle} keyHandle
 * @returns {CipherOptHandle}
 **/
module.exports.newAsymmetric = (keyHandle) => {
  return getObj(keyHandle)
    .then((obj) => obj.app.cipherOpt.newAsymmetric(obj.netObj)
      .then((cipherOpt) => genHandle(obj.app, cipherOpt)));
};

/**
 * Free the CipherOpt instance from memory
 * @param {String} cipherOptHandle - the cipher opt handle
 */
module.exports.free = (cipherOptHandle) => freeObj(cipherOptHandle);
