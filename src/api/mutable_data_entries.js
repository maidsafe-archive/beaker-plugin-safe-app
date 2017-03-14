const safe_app = require('safe-app');
const addObjToMap = require('./helpers').addObjToMap;
const newMutationObj = require('./mutable_data_mutation').newMutationObj;
var appTokens = require('./app_tokens');

var entries_handles = new Map();

module.exports.newEntriesObj = (entries) => addObjToMap(entries_handles, entries);

module.exports.manifest = {
  len: 'promise',
  get: 'promise',
  forEach: 'promise',
  insert: 'promise',
  mutate: 'promise',
};


/**
* Get the total number of entries in the Mdata
* @param {String} appToken - the application token
* @param {EntriesHandle} entriesHandle - the Entries obj handle
* @returns {Promise<Number>}
**/
module.exports.len = (appToken, entriesHandle) => {
  return appTokens.getApp(appToken)
          .then((app) => entries_handles.get(entriesHandle).len());
}

/**
* Look up the value of a specific key
*
* @param {String} appToken - the application token
* @param {EntriesHandle} entriesHandle - the Entries obj handle
* @param {String} keyName - the entry's key
* @returns {Promise<ValueVersion>} - the value at the current version
**/
module.exports.get = (appToken, entriesHandle, keyName) => {
  return appTokens.getApp(appToken)
          .then((app) => entries_handles.get(entriesHandle).get(keyName));
}

/**
* Iterate over the entries, execute the function every time
* @param {String} appToken - the application token
* @param {EntriesHandle} entriesHandle - the Entries obj handle
* @param {function(Buffer, ValueVersion)} fn - the function to call
* @returns {Promise<()>} - resolves once the iteration is done
**/
module.exports.forEach = (appToken, entriesHandle, fn) => {
  return appTokens.getApp(appToken)
          .then((app) => entries_handles.get(entriesHandle).forEach(fn));
}

/**
* Insert a new entry. Will directly commit that transaction to the network.
* Will fail if the entry already exists or the current app doesn't have the
* permissions to edit that mdata.
*
* @param {String} appToken - the application token
* @param {EntriesHandle} entriesHandle - the Entries obj handle
* @param {(String|Buffer)} keyName - the key you want store the data under
* @param {(String|Buffer)} value - the data you want to store
* @returns {Promise<>}
**/
module.exports.insert = (appToken, entriesHandle, keyName, value) => {
  return appTokens.getApp(appToken)
          .then((app) => entries_handles.get(entriesHandle).insert(keyName, value));
}

/**
* Start a new transaction of mutation of the entries
* @param {String} appToken - the application token
* @param {EntriesHandle} entriesHandle - the Entries obj handle
* @return {Promise<MutationHandle>}
**/
module.exports.mutate = (appToken, entriesHandle) => {
  return appTokens.getApp(appToken)
          .then((app) => entries_handles.get(entriesHandle).mutate())
          .then(newMutationObj);
}
