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
 * @name window.safeImmutableData.create
 *
 * @param {SAFEAppToken} appToken the app handle
 *
 * @returns {Promise<WriterHandle>} the ImmutableData Writer handle
 *
 * @example // Creating a new ImmutableData writer:
 * window.safeImutableData.create(appToken)
 *    .then((idWriterHandle) => console.log('ImmutableData writer handle: ', idWriterHandle));
 **/
module.exports.create = (appToken) => {
  return getObj(appToken)
    .then((obj) => obj.app.immutableData.create()
      .then((imd) => genHandle(obj.app, imd)));
};

/**
 * Look up an existing ImmutableData for the given address
 * @name window.safeImmutableData.fetch
 *
 * @param {SAFEAppToken} appToken the app handle
 * @param {Buffer} address the XorName on the network
 *
 * @returns {Promise<ReaderHandle>} the ImmutableData Reader handle
 *
 * @example // Fetch an exisiting ImmutableData from the network:
 * window.safeImmutableData.create(appToken)
 *    .then((idWriterHandle) => window.safeImmutableData.closeWriter(idWriterHandle))
 *    .then((addr) => window.safeImmutableData.fetch(appToken, addr))
 *    .then((idReaderHandle) => console.log('ImmutableData reader handle: ', idReaderHandle));
 **/
module.exports.fetch = (appToken, address) => {
  return getObj(appToken)
    .then((obj) => obj.app.immutableData.fetch(address)
      .then((imd) => genHandle(obj.app, imd)));
};

/**
 * Append the given data to an ImmutableData.
 * @name window.safeImmutableData.write
 *
 * @param {WriterHandle} writerHandle the ImmutableData Writer handle
 * @param {String} string the data to append
 *
 * @returns {Promise} resolves when finished appending
 *
 * @example // Write data into an ImmutableData:
 * window.safeImmutableData.create(appToken)
 *    .then((idWriterHandle) => window.safeImmutableData.write(idWriterHandle, 'my immutable data')
 *       .then(_ => window.safeImmutableData.closeWriter(idWriterHandle))
 *       .then(_ => console.log('ImmutableData written in the network'))
 *    );
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
 * @name window.safeImmutableData.closeWriter
 *
 * @param {WriterHandle} writerHandle the ImmutableData Writer handle
 *
 * @returns {Promise<String>} the address to the data once written to the network
 *
 * @example // Creating an ImmutableData and closing its writer to commit it to the network:
 * window.safeImmutableData.create(appToken)
 *    .then((idWriterHandle) => window.safeImmutableData.closeWriter(idWriterHandle))
 *    .then((addr) => console.log('ImmutableData was stored at address: ', addr));
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
 * @name window.safeImmutableData.read
 *
 * @param {ReaderHandle} readerHandle the ImmutableData Reader handle
 * @param {Object=} options reading options
 * @param {Number} [options.offset=0] start position
 * @param {Number} [options.end=size] end position or end of data
 *
 * @returns {Promise<String>} the data read
 *
 * @example // Read data from an ImmutableData:
 * window.safeImmutableData.create(appToken)
 *    .then((idWriterHandle) => window.safeImmutableData.write(idWriterHandle, 'my immutable data')
 *       .then(_ => window.safeImmutableData.closeWriter(idWriterHandle))
 *    ).then((addr) => window.safeImmutableData.fetch(appToken, addr))
 *    .then((idReaderHandle) => window.safeImmutableData.read(idReaderHandle))
 *    .then((data) => console.log('ImmutableData data read: ', data.toString()));
 **/
module.exports.read = (readerHandle, options) => {
  return getObj(readerHandle)
    .then((obj) => obj.netObj.read(options));
};

/**
 * The size of the mutable data on the network
 * @name window.safeImmutableData.size
 *
 * @param {ReaderHandle} readerHandle the ImmutableData Reader handle
 *
 * @returns {Promise<Number>} length in bytes
 *
 * @example // Get the size of an ImmutableData:
 * window.safeImmutableData.create(appToken)
 *    .then((idWriterHandle) => window.safeImmutableData.write(idWriterHandle, 'my immutable data')
 *       .then(_ => window.safeImmutableData.closeWriter(idWriterHandle))
 *    ).then((addr) => window.safeImmutableData.fetch(appToken, addr))
 *    .then((idReaderHandle) => window.safeImmutableData.size(idReaderHandle))
 *    .then((size) => console.log('Size of the ImmutableData: ', size));
 **/
module.exports.size = (readerHandle) => {
  return getObj(readerHandle)
    .then((obj) => obj.netObj.size());
};

/**
 * Free the ImmutableData Reader instance from memory
 * @name window.safeImmutableData.free
 *
 * @param {String} readerHandle the ImmutableData Reader handle
 */
module.exports.free = (readerHandle) => freeObj(readerHandle);

/**
 * @name ReaderHandle
 * @typedef {String} ReaderHandle
 * @description Holds the reference to a ImmutableData Reader instance.
 * Note that it is required to free the memory used by such an instance when it's
 * not needed anymore by the client aplication, please refer to the `free` function.
 **/

/**
 * @name WriterHandle
 * @typedef {String} WriterHandle
 * @description Holds the reference to a ImmutableData Writer instance.
 * Note that such an instance it's free from memory when the `close` function
 * is invoked.
 **/
