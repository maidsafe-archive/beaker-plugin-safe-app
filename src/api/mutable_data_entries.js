const safe_app = require('safe-app');
var appTokens = require('./app_tokens');

var entries_handles = new Array();

const addEntriesObj = (entries) => {
  entries_handles[entries.ref] = entries;
  return entries.ref;
}

module.exports.addEntriesObj = addEntriesObj;

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
          .then((app) => entries_handles[entriesHandle].len());
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
          .then((app) => entries_handles[entriesHandle].get(keyName));
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
          .then((app) => entries_handles[entriesHandle].forEach(fn));
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
          .then((app) => entries_handles[entriesHandle].insert(keyName, value));
}

/**
* Start a new transaction of mutation of the entries
* @param {String} appToken - the application token
* @param {EntriesHandle} entriesHandle - the Entries obj handle
* @return {Promise<EntryMutationTransaction>}
**/
module.exports.mutate = (appToken, entriesHandle) => {
  return appTokens.getApp(appToken)
          .then((app) => entries_handles[entriesHandle].mutate());
//          .then(addMutationObj);
}
