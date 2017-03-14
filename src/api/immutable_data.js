const {genHandle, getObj, freeObj} = require('./handles');

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
* @param {String} appToken - the application token
* @returns {Promise<Handle>} - the ImmutableData Writer Handle
**/
module.exports.create = (appToken) => {
  return getObj(appToken)
          .then((app) => app.immutableData.create())
          .then(genHandle);
}

/**
* Look up an existing Immutable Data for the given address
* @param {String} appToken - the application token
* @param {Buffer} address - the XorName on the network
* @returns {Promise<Handle>} - the ImmutableData Reader Handle
**/
module.exports.fetch = (appToken, address) => {
  return getObj(appToken)
          .then((app) => app.immutableData.fetch(address))
          .then(genHandle);
}

/**
* Append the given data to immutable Data.
*
* @param {String} appToken - the application token
* @param {Handle} writerHandle - the writer handle
* @param {String} string
* @returns {Promise<()>}
**/
module.exports.write = (appToken, writerHandle, string) => {
  return getObj(appToken)
          .then((app) => getObj(writerHandle))
          .then((writer) => writer.write(string));
}

/**
* Close and write the immutable Data to the network.
* @param {String} appToken - the application token
* @param {Handle} writerHandle - the writer handle
* @returns {Promise<String>} the address to the data once written to the network
**/
module.exports.closeWriter = (appToken, writerHandle) => {
  return getObj(appToken)
          .then((app) => getObj(writerHandle))
          .then((writer) => writer.close())
          .then((addr) => {
            freeObj(writerHandle);
            return addr;
          })
}

/**
* Read the given amount of bytes from the network
* @param {String} appToken - the application token
* @param {Handle} readerHandle - the reader handle
* @param {Object=} options
* @param {Number} [options.offset=0] start position
* @param {Number} [options.end=size] end position or end of data
**/
module.exports.read = (appToken, readerHandle, options) => {
  return getObj(appToken)
          .then((app) => getObj(readerHandle))
          .then((reader) => reader.read(options));
}

/**
* The size of the mutable data on the network
* @param {String} appToken - the application token
* @param {Handle} readerHandle - the reader handle
* @returns {Promise<Number>} length in bytes
**/
module.exports.size = (appToken, readerHandle) => {
  return getObj(appToken)
          .then((app) => getObj(readerHandle))
          .then((reader) => reader.size());
}

/**
* Close the Reader handle
* @param {String} appToken - the application token
* @param {Handle} readerHandle - the reader handle
* @returns {Promise<()>}
*/
module.exports.closeReader = (appToken, readerHandle) => {
  return getObj(appToken)
          .then((app) => getObj(readerHandle))
          .then((reader) => reader.close())
          .then(() => freeObj(readerHandle));
}
