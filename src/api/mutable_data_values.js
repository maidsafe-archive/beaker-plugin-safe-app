const { getObj, freeObj, forEachHelper } = require('./helpers');

module.exports.manifest = {
  len: 'promise',
  _with_cb_forEach: 'readable',
  free: 'sync'
};

/**
 * Get the total number of values in the MutableData
 * @name window.safeMutableDataValues.len
 *
 * @param {ValuesHandle} valuesHandle the Values handle
 *
 * @returns {Promise<Number>} the number of values
 *
 * @example // Retrieving the number of values:
 * window.safeMutableData.getValues(mdHandle)
 *    .then((valuesHandle) => window.safeMutableDataValues.len(valuesHandle))
 *    .then((len) => console.log('Number of values in the MutableData: ', len));
 **/
module.exports.len = (valuesHandle) => {
  return getObj(valuesHandle)
    .then((obj) => obj.netObj.len());
};

/**
 * Iterate over the values, execute the function every time
 * @name window.safeMutableDataValues.forEach
 *
 * @param {ValuesHandle} valuesHandle the Values handle
 * @param {function(Buffer, ValueVersion)} fn the function to call
 *
 * @returns {Promise} resolves once the iteration finished
 *
 * @example // Iterating over the values of a MutableData:
 * window.safeMutableData.getValues(mdHandle)
 *    .then((valuesHandle) => window.safeMutableDataValues.forEach(valuesHandle, (v) => {
 *          console.log('Value: ', v.buf.toString());
 *          console.log('Version: ', v.version);
 *       }).then(_ => console.log('Iteration finished'))
 *    );
 **/
module.exports._with_cb_forEach = (valuesHandle) => {
  return forEachHelper(valuesHandle);
};

/**
 * Free the Values instance from memory
 * @name window.safeMutableDataValues.free
 *
 * @param {String} valuesHandle the Values handle
 **/
module.exports.free = (valuesHandle) => freeObj(valuesHandle);

/**
 * @name ValuesHandle
 * @typedef {String} ValuesHandle
 * @description Holds the reference to a Values instance.
 * Note that it is required to free the memory used by such an instance when it's
 * not needed anymore by the client aplication, please refer to the `free` function.
 **/
