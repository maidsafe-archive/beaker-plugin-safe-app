const { getObj, freeObj, forEachHelper } = require('./helpers');

module.exports.manifest = {
  len: 'promise',
  _with_cb_forEach: 'readable',
  free: 'sync'
};

/**
 * Get the total number of values in the Mdata
 * @param {String} appToken - the application token
 * @param {ValuesHandle} valuesHandle - the Values obj handle
 * @returns {Promise<Number>}
 **/
module.exports.len = (appToken, valuesHandle) => {
  return getObj(appToken)
    .then(() => getObj(valuesHandle))
    .then((values) => values.len());
};

/**
 * Iterate over the value, execute the function every time
 * @param {String} appToken - the application token
 * @param {ValuesHandle} valuesHandle - the Values obj handle
 * @param {function(Buffer, ValueVersion)} fn - the function to call
 * @returns {Promise<()>} - resolves once the iteration is done
 **/
module.exports._with_cb_forEach = (appToken, valuesHandle) => {
  return forEachHelper(appToken, valuesHandle);
};

/**
 * Free the Values instance from memory
 * @param {String} valuesHandle - the Values handle
 */
module.exports.free = (valuesHandle) => freeObj(valuesHandle);
