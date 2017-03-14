const safe_app = require('safe-app');
const addObjToMap = require('./helpers').addObjToMap;
var appTokens = require('./app_tokens');

var values_handles = new Map();

module.exports.newValuesObj = (values) => addObjToMap(values_handles, values);

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
          .then((app) => values_handles.get(valuesHandle).len());
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
          .then((app) => values_handles.get(valuesHandle).forEach(fn));
}
