const { genHandle, getObj } = require('./helpers');

module.exports.manifest = {
  sha3Hash: 'promise',
  getAppPubSignKey: 'promise',
  getAppPubEncKey: 'promise',
  generateEncKeyPair: 'promise',
  getSignKeyFromRaw: 'promise',
  pubEncKeyKeyFromRaw: 'promise'
};

/**
 * Hash the given input with SHA3 Hash
 *
 * @param {SAFEAppToken} appToken the app handle
 * @param {(String|Buffer)} data the input string
 *
 * @returns {Promise<Buffer>} the hash generated
 */
module.exports.sha3Hash = (appToken, data) => {
  return getObj(appToken)
    .then((app) => app.crypto.sha3Hash(data));
};

/**
 * Get the application's public signing key
 *
 * @param {SAFEAppToken} appToken the app handle
 *
 * @returns {Promise<SignKeyHandle>} the SignKey handle
 */
module.exports.getAppPubSignKey = (appToken) => {
  return getObj(appToken)
    .then((obj) => obj.app.crypto.getAppPubSignKey()
      .then((signKey) => genHandle(obj.app, signKey)));
};

/**
 * Get the application's public encryption key
 *
 * @param {SAFEAppToken} appToken the app handle
 * @returns {Promise<PubEncKeyHandle>} the PubEncKey handle
 */
module.exports.getAppPubEncKey = (appToken) => {
  return getObj(appToken)
    .then((obj) => obj.app.crypto.getAppPubEncKey()
      .then((encKey) => genHandle(obj.app, encKey)));
};

/**
 * Generate a new Asymmetric EncryptionKeyPair
 *
 * @param {SAFEAppToken} appToken the app handle
 *
 * @returns {Promise<KeyPairHandle>} the KeyPair handle
 */
module.exports.generateEncKeyPair = (appToken) => {
  return getObj(appToken)
    .then((obj) => obj.app.crypto.generateEncKeyPair()
      .then((kp) => genHandle(obj.app, kp)));
};

/**
 * Interpret the SignKey from a given raw string
 *
 * @param {SAFEAppToken} appToken the app handle
 * @param {(String|Buffer)} raw the raw input string
 *
 * @returns {Promise<SignKeyHandle>} the SignKey handle
 */
module.exports.getSignKeyFromRaw = (appToken, raw) => {
  return getObj(appToken)
    .then((obj) => obj.app.crypto.getSignKeyFromRaw(raw)
      .then((signKey) => genHandle(obj.app, signKey)));
};

/**
 * Interprete a public encryption Key from a given raw string
 *
 * @param {SAFEAppToken} appToken the app handle
 * @param {(String|Buffer)} raw the raw input string
 *
 * @returns {Promise<PubEncKeyHandle>} the PubEncKey handle
 */
module.exports.pubEncKeyKeyFromRaw = (appToken, raw) => {
  return getObj(appToken)
    .then((obj) => obj.app.crypto.pubEncKeyKeyFromRaw(raw)
      .then((pubEncKey) => genHandle(obj.app, pubEncKey)));
};

/**
 * Interpret a secret encryption Key from a given raw string
 *
 * @param {SAFEAppToken} appToken the app handle
 * @param {(String|Buffer)} raw the raw input string
 *
 * @returns {Promise<SecEncKey>} the SecEncKey handle
 */
module.exports.secEncKeyKeyFromRaw = (appToken, raw) => {
  return getObj(appToken)
    .then((obj) => obj.app.crypto.secEncKeyKeyFromRaw(raw)
      .then((secEncKey) => genHandle(obj.app, secEncKey)));
};

/**
 * Generate a new Asymmetric EncryptionKeyPair from raw secret and public keys
 *
 * @param {SAFEAppToken} appToken the app handle
 * @param {(String|Buffer)} rawPublicKey the raw public key string
 * @param {(String|Buffer)} rawSecretKey the raw secret key string
 *
 * @returns {Promise<KeyPair>} the KeyPair handle
 */
module.exports.generateEncKeyPairFromRaw = (appToken, rawPublicKey, rawSecretKey) => {
  return getObj(appToken)
    .then((obj) => obj.app.crypto.generateEncKeyPairFromRaw(rawPublicKey, rawSecretKey)
      .then((kp) => genHandle(obj.app, kp)));
};
