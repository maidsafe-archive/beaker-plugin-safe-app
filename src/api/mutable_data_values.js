const safe_app = require('safe-app');
var appTokens = require('./app_tokens');

var values_handles = new Array();

const addValuesObj = (values) => {
  values_handles[values.ref] = values;
  return values.ref;
}

module.exports.addValuesObj = addValuesObj;

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
  return appTokens.getApp(appToken)
          .then((app) => values_handles[valuesHandle].len());
}

/**
* Iterate over the value, execute the function every time
* @param {String} appToken - the application token
* @param {ValuesHandle} valuesHandle - the Values obj handle
* @param {function(Buffer, ValueVersion)} fn - the function to call
* @returns {Promise<()>} - resolves once the iteration is done
**/
module.exports.forEach = (appToken, valuesHandle, fn) => {
  return appTokens.getApp(appToken)
          .then((app) => values_handles[valuesHandle].forEach(fn));
}
