const { getObj, freeObj, forEachHelper } = require('./helpers');

module.exports.manifest = {
  len: 'promise',
  _with_cb_forEach: 'readable',
  free: 'sync'
};

/**
 * Get the total number of keys in the MutableData
 * @name window.safeMutableDataKeys.len
 *
 * @param {KeysHandle} keysHandle the Keys handle
 *
 * @returns {Promise<Number>} the number of keys
 *
 * @example // Retrieving the number of keys:
 * window.safeMutableData.getKeys(mdHandle)
 *    .then((keysHandle) => window.safeMutableDataKeys.len(keysHandle))
 *    .then((len) => console.log('Number of keys in the MutableData: ', len));
 **/
module.exports.len = (keysHandle) => {
  return getObj(keysHandle)
    .then((obj) => obj.netObj.len());
};

/**
 * Iterate over the keys, execute the function every time
 * @name window.safeMutableDataKeys.forEach
 *
 * @param {KeysHandle} keysHandle the Keys handle
 * @param {function(Buffer)} fn the function to call with the key in the buffer
 *
 * @returns {Promise} resolves once the iteration is done
 *
 * @example // Iterating over the keys of a MutableData:
 * window.safeMutableData.getKeys(mdHandle)
 *    .then((keysHandle) => window.safeMutableDataKeys.forEach(keysHandle, (k) => {
 *          console.log('Key: ', k.toString());
 *       }).then(_ => console.log('Iteration finished'))
 *    );
 **/
module.exports._with_cb_forEach = (keysHandle) => {
  return forEachHelper(keysHandle);
}

/**
 * Free the Keys instance from memory
 * @name window.safeMutableDataKeys.free
 *
 * @param {String} keysHandle the Keys handle
 **/
module.exports.free = (keysHandle) => freeObj(keysHandle);

/**
 * @name KeysHandle
 * @typedef {String} KeysHandle
 * @description Holds the reference to a Keys instance.
 * Note that it is required to free the memory used by such an instance when it's
 * not needed anymore by the client aplication, please refer to the `free` function.
 **/
