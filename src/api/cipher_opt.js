const safe_app = require('safe-app');
var appTokens = require('./app_tokens');

var cipher_opt_handles = new Array();

module.exports.manifest = {
  newPlainText: 'promise',
  newSymmetric: 'promise',
  newAsymmetric: 'promise',
};

/**
* Create a PlainText Cipher Opt
* @param {String} appToken - the application token
* @returns {CipherOpt}
**/
module.exports.newPlainText = (appToken) => {
  return appTokens.getApp(appToken)
          .then((app) => app.cipherOpt.newPlainText())
          .then((cipherOpt) => {
            cipher_opt_handles[cipherOpt.ref] = cipherOpt;
            return cipherOpt.ref;
          });
}

/**
* Create a new Symmetric Cipher
* @param {String} appToken - the application token
* @returns {CipherOpt}
**/
module.exports.newSymmetric = (appToken) => {
  return appTokens.getApp(appToken)
          .then((app) => app.cipherOpt.newSymmetric())
          .then((cipherOpt) => {
            cipher_opt_handles[cipherOpt.ref] = cipherOpt;
            return cipherOpt.ref;
          });
}

/**
* Create a new Asymmetric Cipher for the given key
* @param {String} appToken - the application token
* @param {EncKey} key
* @returns {CipherOpt}
**/
module.exports.newAsymmetric = (appToken, key) => {
  return appTokens.getApp(appToken)
          .then((app) => app.cipherOpt.newAsymmetric(key))
          .then((cipherOpt) => {
            cipher_opt_handles[cipherOpt.ref] = cipherOpt;
            return cipherOpt.ref;
          });
}
