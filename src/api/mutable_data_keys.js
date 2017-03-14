const safe_app = require('safe-app');
const addObjToMap = require('./helpers').addObjToMap;
var appTokens = require('./app_tokens');

var keys_handles = new Map();

module.exports.newKeysObj = (keys) => addObjToMap(keys_handles, keys);

module.exports.manifest = {
  len: 'promise',
  forEach: 'promise',
};

/**
* Get the total number of keys in the Mdata
* @param {String} appToken - the application token
* @param {KeysHandle} keysHandle - the Keys obj handle
* @returns {Promise<Number>}
**/
module.exports.len = (appToken, keysHandle) => {
  return appTokens.getApp(appToken)
          .then((app) => keys_handles.get(keysHandle).len());
}

/**
* Iterate over the value, execute the function every time
* @param {String} appToken - the application token
* @param {KeysHandle} keysHandle - the Keys obj handle
* @param {function(Buffer)} fn - the function to call with the key in the buffer
* @returns {Promise<()>} - resolves once the iteration is done
**/
module.exports.forEach = (appToken, keysHandle, fn) => {
  return appTokens.getApp(appToken)
          .then((app) => keys_handles.get(keysHandle).forEach(fn));
}
