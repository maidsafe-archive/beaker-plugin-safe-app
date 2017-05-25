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
 * Get the total number of entries in the MutableData
 * @name window.safeMutableDataEntries.len
 *
 * @param {EntriesHandle} entriesHandle the Entries handle
 *
 * @returns {Promise<Number>} number of entries
 **/
module.exports.len = (entriesHandle) => {
  return getObj(entriesHandle)
    .then((obj) => obj.netObj.len());
};

/**
 * Look up the value of a specific key
 * @name window.safeMutableDataEntries.get
 *
 * @param {EntriesHandle} entriesHandle the Entries handle
 * @param {String} keyName the entry's key
 *
 * @returns {Promise<ValueVersion>} the current version
 **/
module.exports.get = (entriesHandle, keyName) => {
  return getObj(entriesHandle)
    .then((obj) => obj.netObj.get(keyName));
};

/**
 * Iterate over the entries, execute the function every time
 * @name window.safeMutableDataEntries.forEach
 *
 * @param {EntriesHandle} entriesHandle the Entries handle
 * @param {function(Buffer, ValueVersion)} fn the function to call
 *
 * @returns {Promise} resolves once the iteration is done
 *
 * @example // Iterating over the entries of a MutableData:
 * window.safeMutableData.getEntries(mdHandle)
 *    .then((entriesHandle) => window.safeMutableDataEntries.forEach(entriesHandle, (k, v) => {
 *       console.log("Key:", k);
 *       console.log("Value:", v.buf.toString());
 *       console.log("Version:", v.version);
 *    }));
 **/
module.exports._with_cb_forEach = (entriesHandle) => {
  return forEachHelper(entriesHandle);
};

/**
 * Insert a new entry. Will directly commit that transaction to the network.
 * Will fail if the entry already exists or the current app doesn't have the
 * permissions to edit that MutableData.
 * @name window.safeMutableDataEntries.insert
 *
 * @param {EntriesHandle} entriesHandle the Entries handle
 * @param {(String|Buffer)} keyName the key you want store the data under
 * @param {(String|Buffer)} value the data you want to store
 *
 * @returns {Promise} resolves when finished
 **/
module.exports.insert = (entriesHandle, keyName, value) => {
  return getObj(entriesHandle)
    .then((obj) => obj.netObj.insert(keyName, value));
};

/**
 * Start a new transaction of mutation of the entries
 * @name window.safeMutableDataEntries.mutate
 *
 * @param {EntriesHandle} entriesHandle the Entries handle
 *
 * @returns {Promise<MutationHandle>} the Mutation handle
 **/
module.exports.mutate = (entriesHandle) => {
  return getObj(entriesHandle)
    .then((obj) => obj.netObj.mutate()
      .then((mut) => genHandle(obj.app, mut)));
};

/**
 * Free the Entries instance from memory
 * @name window.safeMutableDataEntries.free
 *
 * @param {String} entriesHandle the Entries handle
 **/
module.exports.free = (entriesHandle) => freeObj(entriesHandle);

/**
 * @name EntriesHandle
 * @typedef {String} EntriesHandle
 * @description Holds the reference to an Entries instance.
 * Note that it is required to free the memory used by such an instance when it's
 * not needed anymore by the client aplication, please refer to the `free` function.
 **/
