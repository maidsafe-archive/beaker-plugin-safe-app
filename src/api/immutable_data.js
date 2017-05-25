const { genHandle, getObj, freeObj } = require('./helpers');

module.exports.manifest = {
  create: 'promise',
  fetch: 'promise',
  write: 'promise',
  closeWriter: 'promise',
  read: 'promise',
  size: 'promise',
  closeReader: 'promise',
};

/**
 * @typedef {String} ReaderHandle
 * @description Holds the reference to a ImmutableData Reader instance.
 * Note that it is required to free the memory used by such an instance when it's
 * not needed anymore by the client aplication, please refer to the `free` function.
 **/

/**
 * @typedef {String} WriterHandle
 * @description Holds the reference to a ImmutableData Writer instance.
 * Note that such an instance it's free from memory when the `close` function
 * is invoked.
 **/

/**
 * Create a new ImmutableData Writer
 *
 * @param {SAFEAppToken} appToken the app handle
 *
 * @returns {Promise<WriterHandle>} the ImmutableData Writer handle
 **/
module.exports.create = (appToken) => {
  return getObj(appToken)
    .then((obj) => obj.app.immutableData.create()
      .then((imd) => genHandle(obj.app, imd)));
};

/**
 * Look up an existing ImmutableData for the given address
 *
 * @param {SAFEAppToken} appToken the app handle
 * @param {Buffer} address the XorName on the network
 *
 * @returns {Promise<ReaderHandle>} the ImmutableData Reader handle
 **/
module.exports.fetch = (appToken, address) => {
  return getObj(appToken)
    .then((obj) => obj.app.immutableData.fetch(address)
      .then((imd) => genHandle(obj.app, imd)));
};

/**
 * Append the given data to an ImmutableData.
 *
 * @param {WriterHandle} writerHandle the ImmutableData Writer handle
 * @param {String} string the data to append
 *
 * @returns {Promise} resolves when finished appending
 **/
module.exports.write = (writerHandle, string) => {
  return getObj(writerHandle)
    .then((obj) => obj.netObj.write(string));
};

/**
 * Close and write the ImmutableData to the network.
 * Note this operation will free the ImmutableData Writer from the memory
 * after the data is written in the network.
 * Thus, a new Writer instance shall be created if more writing operations
 * into the ImmutableData are required.
 *
 * @param {WriterHandle} writerHandle the ImmutableData Writer handle
 *
 * @returns {Promise<String>} the address to the data once written to the network
 **/
module.exports.closeWriter = (writerHandle) => {
  return getObj(writerHandle)
    .then((obj) => obj.netObj.close())
    .then((addr) => {
      freeObj(writerHandle);
      return addr;
    });
};

/**
 * Read the given amount of bytes from the network
 *
 * @param {ReaderHandle} readerHandle the ImmutableData Reader handle
 * @param {Object=} options reading options
 * @param {Number} [options.offset=0] start position
 * @param {Number} [options.end=size] end position or end of data
 *
 * @returns {Promise<String>} the data read
 **/
module.exports.read = (readerHandle, options) => {
  return getObj(readerHandle)
    .then((obj) => obj.netObj.read(options));
};

/**
 * The size of the mutable data on the network
 *
 * @param {ReaderHandle} readerHandle the ImmutableData Reader handle
 *
 * @returns {Promise<Number>} length in bytes
 **/
module.exports.size = (readerHandle) => {
  return getObj(readerHandle)
    .then((obj) => obj.netObj.size());
};

/**
 * Free the ImmutableData Reader instance from memory
 *
 * @param {String} readerHandle the ImmutableData Reader handle
 */
module.exports.free = (readerHandle) => freeObj(readerHandle);
