const { genHandle, getObj } = require('./helpers');

module.exports.manifest = {
  sha3Hash: 'promise',
  getAppPubSignKey: 'promise',
  getAppPubEncKey: 'promise',
  generateEncKeyPair: 'promise',
  getSignKeyFromRaw: 'promise',
  pubEncKeyKeyFromRaw: 'promise',
  secEncKeyKeyFromRaw: 'promise',
  generateEncKeyPairFromRaw: 'promise',
  generateNonce: 'promise'
};

/**
 * Hash the given input with SHA3 Hash
 * @name window.safeCrypto.sha3Hash
 *
 * @param {SAFEAppHandle} appHandle the app handle
 * @param {(String|Buffer)} data the input string
 *
 * @returns {Promise<Buffer>} the hash generated
 *
 * @example // Generating a hash:
 * window.safeCrypto.sha3Hash(appHandle, '1010101010101')
 *    .then((hash) => console.log('SHA3 Hash generated: ', hash.toString('hex')));
 * */
module.exports.sha3Hash = (appHandle, data) => getObj(appHandle)
    .then((obj) => obj.app.crypto.sha3Hash(data));

/**
 * Get the application's public signing key
 * @name window.safeCrypto.getAppPubSignKey
 *
 * @param {SAFEAppHandle} appHandle the app handle
 *
 * @returns {Promise<SignKeyHandle>} the SignKey handle
 *
 * @example // Retrieving application's public sign key:
 * window.safeCrypto.getAppPubSignKey(appHandle)
 *    .then((signKeyHandle) => window.safeCryptoSignKey.getRaw(signKeyHandle))
 *    .then((rawPk) => console.log('App\'s public sign key: ', rawPk.buffer.toString('hex')));
 * */
module.exports.getAppPubSignKey = (appHandle) => getObj(appHandle)
    .then((obj) => obj.app.crypto.getAppPubSignKey()
      .then((signKey) => genHandle(obj.app, signKey)));

/**
 * Get the application's public encryption key
 * @name window.safeCrypto.getAppPubEncKey
 *
 * @param {SAFEAppHandle} appHandle the app handle
 * @returns {Promise<PubEncKeyHandle>} the PubEncKey handle
 *
 * @example // Retrieving application's public encryption key:
 * window.safeCrypto.getAppPubEncKey(appHandle)
 *    .then((pubEncKeyHandle) => window.safeCryptoPubEncKey.getRaw(pubEncKeyHandle))
 *    .then((rawPk) => console.log('App\'s public encryption key: ', rawPk.buffer.toString('hex')));
 * */
module.exports.getAppPubEncKey = (appHandle) => getObj(appHandle)
    .then((obj) => obj.app.crypto.getAppPubEncKey()
      .then((encKey) => genHandle(obj.app, encKey)));

/**
 * Generate a new Asymmetric EncryptionKeyPair
 * @name window.safeCrypto.generateEncKeyPair
 *
 * @param {SAFEAppHandle} appHandle the app handle
 *
 * @returns {Promise<KeyPairHandle>} the KeyPair handle
 *
 * @example // Generating encryption key pair:
 * window.safeCrypto.generateEncKeyPair(appHandle)
 *    .then((encKeyPairHandle) => window.safeCryptoKeyPair.getPubEncKey(encKeyPairHandle))
 *    .then((pubEncKeyHandle) => window.safeCryptoPubEncKey.getRaw(pubEncKeyHandle))
 *    .then((rawPk) => console.log('Public encryption key\
 *    generated: ', rawPk.buffer.toString('hex')));
 * */
module.exports.generateEncKeyPair = (appHandle) => getObj(appHandle)
    .then((obj) => obj.app.crypto.generateEncKeyPair()
      .then((kp) => genHandle(obj.app, kp)));

/**
 * Interpret the SignKey from a given raw string
 * @name window.safeCrypto.getSignKeyFromRaw
 *
 * @param {SAFEAppHandle} appHandle the app handle
 * @param {(String|Buffer)} raw the raw input string
 *
 * @returns {Promise<SignKeyHandle>} the SignKey handle
 *
 * @example // Interpreting a sign key from a raw string:
 * window.safeCrypto.getAppPubSignKey(appHandle)
 *    .then((signKeyHandle) => window.safeCryptoSignKey.getRaw(signKeyHandle))
 *    .then((raw) => window.safeCrypto.getSignKeyFromRaw(appHandle, raw))
 *    .then((signKeyHandle) => window.safeCryptoSignKey.getRaw(signKeyHandle))
 *    .then((rawSignKey) => console.log('Sign key: ', rawSignKey.buffer.toString('hex')));
 * */
module.exports.getSignKeyFromRaw = (appHandle, raw) => getObj(appHandle)
    .then((obj) => obj.app.crypto.getSignKeyFromRaw(raw)
      .then((signKey) => genHandle(obj.app, signKey)));

/**
 * Interprete a public encryption Key from a given raw string
 * @name window.safeCrypto.pubEncKeyKeyFromRaw
 *
 * @param {SAFEAppHandle} appHandle the app handle
 * @param {(String|Buffer)} raw the raw input string
 *
 * @returns {Promise<PubEncKeyHandle>} the PubEncKey handle
 *
 * @example // Interpreting a public encryption key from a raw string:
 * window.safeCrypto.getAppPubEncKey(appHandle)
 *    .then((pubEncKeyHandle) => window.safeCryptoPubEncKey.getRaw(pubEncKeyHandle))
 *    .then((raw) => window.safeCrypto.pubEncKeyKeyFromRaw(appHandle, raw))
 *    .then((pubEncKeyHandle) => window.safeCryptoPubEncKey.getRaw(pubEncKeyHandle))
 *    .then((rawPubEncKey) => console.log(
 *    'Public encrpytion key: ', rawPubEncKey.buffer.toString('hex')
 *    ));
 * */
module.exports.pubEncKeyKeyFromRaw = (appHandle, raw) => getObj(appHandle)
    .then((obj) => obj.app.crypto.pubEncKeyKeyFromRaw(raw)
      .then((pubEncKey) => genHandle(obj.app, pubEncKey)));

/**
 * Interpret a secret encryption Key from a given raw string
 * @name window.safeCrypto.secEncKeyKeyFromRaw
 *
 * @param {SAFEAppHandle} appHandle the app handle
 * @param {(String|Buffer)} raw the raw input string
 *
 * @returns {Promise<SecEncKey>} the SecEncKey handle
 *
 * @example // Interpreting a secret encryption key from a raw string:
 * window.safeCrypto.generateEncKeyPair(appHandle)
 *    .then((encKeyPairHandle) => window.safeCryptoKeyPair.getSecEncKey(encKeyPairHandle))
 *    .then((secEncKeyHandle) => window.safeCryptoSecEncKey.getRaw(secEncKeyHandle))
 *    .then((raw) => window.safeCrypto.secEncKeyKeyFromRaw(appHandle, raw))
 *    .then((secEncKeyHandle) => window.safeCryptoSecEncKey.getRaw(secEncKeyHandle))
 *    .then((rawSecEncKey) => console.log(
 *      'Secret encrpytion key: ', rawSecEncKey.buffer.toString('hex')
 *    ));
 * */
module.exports.secEncKeyKeyFromRaw = (appHandle, raw) => getObj(appHandle)
    .then((obj) => obj.app.crypto.secEncKeyKeyFromRaw(raw)
      .then((secEncKey) => genHandle(obj.app, secEncKey)));

/**
 * Generate a new Asymmetric EncryptionKeyPair from raw secret and public keys
 * @name window.safeCrypto.generateEncKeyPairFromRaw
 *
 * @param {SAFEAppHandle} appHandle the app handle
 * @param {(String|Buffer)} rawPublicKey the raw public key string
 * @param {(String|Buffer)} rawSecretKey the raw secret key string
 *
 * @returns {Promise<KeyPair>} the KeyPair handle
 *
 * @example // Generting an encryption key pair from raw secret and public encryption key strings:
 * window.safeCrypto.generateEncKeyPair(appHandle)
 *    .then((encKeyPairHandle) => window.safeCryptoKeyPair.getSecEncKey(encKeyPairHandle)
 *       .then((secEncKeyHandle) => window.safeCryptoSecEncKey.getRaw(secEncKeyHandle)
 *          .then((rawSecEncKey) => window.safeCryptoKeyPair.getPubEncKey(encKeyPairHandle)
 *             .then((pubEncKeyHandle) => window.safeCryptoPubEncKey.getRaw(pubEncKeyHandle))
 *             .then((rawPubEncKey) => window.safeCrypto.generateEncKeyPairFromRaw(
 *                appHandle,
 *                rawPubEncKey,
 *                rawSecEncKey
 *               ))
 *             .then((encKeyPairHandle) => console.log(
 *                'Encryption key pair generated from raw strings'
 *              ))
 *          )));
 * */
module.exports.generateEncKeyPairFromRaw = (
    appHandle,
    rawPublicKey,
    rawSecretKey
    ) => getObj(appHandle)
    .then((obj) => obj.app.crypto.generateEncKeyPairFromRaw(rawPublicKey, rawSecretKey)
      .then((kp) => genHandle(obj.app, kp)));

/**
 * Generate a nonce that can be used when creating private MutableData
 * @name window.safeCrypto.generateNonce
 *
 * @param {SAFEAppHandle} appHandle the app handle
 *
 * @returns {Promise<Buffer>} the nonce generated
 *
 * @example // Generating a nonce:
 * window.safeCrypto.generateNonce(appHandle)
 *    .then((nonce) => console.log('Nonce generated: ', nonce.buffer.toString('hex')));
 * */
module.exports.generateNonce = (appHandle) => getObj(appHandle)
    .then((obj) => obj.app.crypto.generateNonce());
