const {genHandle, getObj} = require('./handles');

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
  return getObj(appToken)
          .then((app) => getObj(entriesHandle))
          .then((entries) => entries.len());
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
  return getObj(appToken)
          .then((app) => getObj(entriesHandle))
          .then((entries) => entries.get(keyName));
}

/**
* Iterate over the entries, execute the function every time
* @param {String} appToken - the application token
* @param {EntriesHandle} entriesHandle - the Entries obj handle
* @param {function(Buffer, ValueVersion)} fn - the function to call
* @returns {Promise<()>} - resolves once the iteration is done
**/
module.exports.forEach = (appToken, entriesHandle, fn) => {
  return getObj(appToken)
          .then((app) => getObj(entriesHandle))
          .then((entries) => entries.forEach(fn));
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
  return getObj(appToken)
          .then((app) => getObj(entriesHandle))
          .then((entries) => entries.insert(keyName, value));
}

/**
* Start a new transaction of mutation of the entries
* @param {String} appToken - the application token
* @param {EntriesHandle} entriesHandle - the Entries obj handle
* @return {Promise<MutationHandle>}
**/
module.exports.mutate = (appToken, entriesHandle) => {
  return getObj(appToken)
          .then((app) => getObj(entriesHandle))
          .then((entries) => entries.mutate())
          .then(genHandle);
}
