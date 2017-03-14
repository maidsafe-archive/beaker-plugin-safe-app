const {genHandle, getObj} = require('./handles');

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
  return getObj(appToken)
          .then((app) => getObj(keysHandle))
          .then((keys) => keys.len());
}

/**
* Iterate over the value, execute the function every time
* @param {String} appToken - the application token
* @param {KeysHandle} keysHandle - the Keys obj handle
* @param {function(Buffer)} fn - the function to call with the key in the buffer
* @returns {Promise<()>} - resolves once the iteration is done
**/
module.exports.forEach = (appToken, keysHandle, fn) => {
  return getObj(appToken)
          .then((app) => getObj(keysHandle))
          .then((keys) => keys.forEach(fn));
}
