const {genHandle, getObj} = require('./handles');

module.exports.manifest = {
  len: 'promise',
  forEach: 'promise',
};

/**
* Get the total number of values in the Mdata
* @param {String} appToken - the application token
* @param {ValuesHandle} valuesHandle - the Values obj handle
* @returns {Promise<Number>}
**/
module.exports.len = (appToken, valuesHandle) => {
  return getObj(appToken)
          .then((app) => getObj(valuesHandle))
          .then((values) => values.len());
}

/**
* Iterate over the value, execute the function every time
* @param {String} appToken - the application token
* @param {ValuesHandle} valuesHandle - the Values obj handle
* @param {function(Buffer, ValueVersion)} fn - the function to call
* @returns {Promise<()>} - resolves once the iteration is done
**/
module.exports.forEach = (appToken, valuesHandle, fn) => {
  return getObj(appToken)
          .then((app) => getObj(valuesHandle))
          .then((values) => values.forEach(fn));
}
