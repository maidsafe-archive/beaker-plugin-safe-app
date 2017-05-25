const { getObj, freeObj, forEachHelper } = require('./helpers');

module.exports.manifest = {
  len: 'promise',
  _with_cb_forEach: 'readable',
  free: 'sync'
};

/**
 * @typedef {String} ValuesHandle
 * @description Holds the reference to a Values instance.
 * Note that it is required to free the memory used by such an instance when it's
 * not needed anymore by the client aplication, please refer to the `free` function.
 **/

/**
 * Get the total number of values in the MutableData
 *
 * @param {ValuesHandle} valuesHandle the Values handle
 *
 * @returns {Promise<Number>} the number of values
 **/
module.exports.len = (valuesHandle) => {
  return getObj(valuesHandle)
    .then((obj) => obj.netObj.len());
};

/**
 * Iterate over the values, execute the function every time
 *
 * @param {ValuesHandle} valuesHandle the Values handle
 * @param {function(Buffer, ValueVersion)} fn the function to call
 *
 * @returns {Promise} resolves once the iteration finished
 **/
module.exports._with_cb_forEach = (valuesHandle) => {
  return forEachHelper(valuesHandle);
};

/**
 * Free the Values instance from memory
 *
 * @param {String} valuesHandle the Values handle
 */
module.exports.free = (valuesHandle) => freeObj(valuesHandle);
