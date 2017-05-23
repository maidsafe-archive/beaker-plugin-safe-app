const { genHandle, getObj, freeObj, forEachHelper } = require('./helpers');

module.exports.manifest = {
  len: 'promise',
  get: 'promise',
  _with_cb_forEach: 'readable',
  insert: 'promise',
  mutate: 'promise',
  free: 'sync'
};


/**
 * Get the total number of entries in the Mdata
 * @param {EntriesHandle} entriesHandle - the Entries obj handle
 * @returns {Promise<Number>}
 **/
module.exports.len = (entriesHandle) => {
  return getObj(entriesHandle)
    .then((obj) => obj.netObj.len());
};

/**
 * Look up the value of a specific key
 *
 * @param {EntriesHandle} entriesHandle - the Entries obj handle
 * @param {String} keyName - the entry's key
 * @returns {Promise<ValueVersion>} - the value at the current version
 **/
module.exports.get = (entriesHandle, keyName) => {
  return getObj(entriesHandle)
    .then((obj) => obj.netObj.get(keyName));
};

/**
 * Iterate over the entries, execute the function every time
 * @param {EntriesHandle} entriesHandle - the Entries obj handle
 * @param {function(Buffer, ValueVersion)} fn - the function to call
 * @returns {Promise<()>} - resolves once the iteration is done
 **/
module.exports._with_cb_forEach = (entriesHandle) => {
  return forEachHelper(entriesHandle);
};

/**
 * Insert a new entry. Will directly commit that transaction to the network.
 * Will fail if the entry already exists or the current app doesn't have the
 * permissions to edit that mdata.
 *
 * @param {EntriesHandle} entriesHandle - the Entries obj handle
 * @param {(String|Buffer)} keyName - the key you want store the data under
 * @param {(String|Buffer)} value - the data you want to store
 * @returns {Promise<>}
 **/
module.exports.insert = (entriesHandle, keyName, value) => {
  return getObj(entriesHandle)
    .then((obj) => obj.netObj.insert(keyName, value));
};

/**
 * Start a new transaction of mutation of the entries
 * @param {EntriesHandle} entriesHandle - the Entries obj handle
 * @return {Promise<MutationHandle>}
 **/
module.exports.mutate = (entriesHandle) => {
  return getObj(entriesHandle)
    .then((obj) => obj.netObj.mutate()
      .then((mut) => genHandle(obj.app, mut)));
};

/**
 * Free the Entries instance from memory
 * @param {String} entriesHandle - the Entries handle
 */
module.exports.free = (entriesHandle) => freeObj(entriesHandle);
