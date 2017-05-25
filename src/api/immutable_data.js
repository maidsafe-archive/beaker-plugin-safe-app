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
 * Create a new ImmutableData Writer
 * @param {SAFEAppToken} appToken the app handle
 * @returns {Promise<Handle>} - the ImmutableData Writer Handle
 **/
module.exports.create = (appToken) => {
  return getObj(appToken)
    .then((obj) => obj.app.immutableData.create()
      .then((imd) => genHandle(obj.app, imd)));
};

/**
 * Look up an existing Immutable Data for the given address
 * @param {SAFEAppToken} appToken the app handle
 * @param {Buffer} address - the XorName on the network
 * @returns {Promise<Handle>} - the ImmutableData Reader Handle
 **/
module.exports.fetch = (appToken, address) => {
  return getObj(appToken)
    .then((obj) => obj.app.immutableData.fetch(address)
      .then((imd) => genHandle(obj.app, imd)));
};

/**
 * Append the given data to ImmutableData.
 *
 * @param {Handle} writerHandle - the writer handle
 * @param {String} string
 * @returns {Promise<()>}
 **/
module.exports.write = (writerHandle, string) => {
  return getObj(writerHandle)
    .then((obj) => obj.netObj.write(string));
};

/**
 * Close and write the immutable Data to the network.
 * @param {Handle} writerHandle - the writer handle
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
 * @param {Handle} readerHandle - the reader handle
 * @param {Object=} options
 * @param {Number} [options.offset=0] start position
 * @param {Number} [options.end=size] end position or end of data
 **/
module.exports.read = (readerHandle, options) => {
  return getObj(readerHandle)
    .then((obj) => obj.netObj.read(options));
};

/**
 * The size of the mutable data on the network
 * @param {Handle} readerHandle - the reader handle
 * @returns {Promise<Number>} length in bytes
 **/
module.exports.size = (readerHandle) => {
  return getObj(readerHandle)
    .then((obj) => obj.netObj.size());
};

/**
 * Free the Reader instance from memory
 * @param {String} readerHandle - the reader handle
 */
module.exports.free = (readerHandle) => freeObj(readerHandle);
