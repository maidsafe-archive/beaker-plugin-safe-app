const safe_app = require('safe-app');
var appTokens = require('./app_tokens');

var imd_handles = new Array();

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
  return appTokens.getApp(appToken)
          .then((app) => app.immutableData.create())
          .then((writer) => {
            imd_handles[writer.ref] = writer;
            return writer.ref;
          });
}

/**
* Look up an existing Immutable Data for the given address
* @param {String} appToken - the application token
* @param {Buffer} address - the XorName on the network
* @returns {Promise<Handle>} - the ImmutableData Reader Handle
**/
module.exports.fetch = (appToken, address) => {
  return appTokens.getApp(appToken)
          .then((app) => app.immutableData.fetch(address))
          .then((reader) => {
            imd_handles[reader.ref] = reader;
            return reader.ref;
          })
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
  return appTokens.getApp(appToken)
          .then((app) => imd_handles[writerHandle].write(string));
}

/**
* Close and write the immutable Data to the network.
* @param {String} appToken - the application token
* @param {Handle} writerHandle - the writer handle
* @returns {Promise<String>} the address to the data once written to the network
**/
module.exports.closeWriter = (appToken, writerHandle) => {
  return appTokens.getApp(appToken)
          .then((app) => imd_handles[writerHandle].close())
          .then((addr) => {
            imd_handles = imd_handles.splice(writerHandle, 1);
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
  return appTokens.getApp(appToken)
          .then((app) => imd_handles[readerHandle].read(options));
}

/**
* The size of the mutable data on the network
* @param {String} appToken - the application token
* @param {Handle} readerHandle - the reader handle
* @returns {Promise<Number>} length in bytes
**/
module.exports.size = (appToken, readerHandle) => {
  return appTokens.getApp(appToken)
          .then((app) => imd_handles[readerHandle].size());
}

/**
* Close the Reader handle
* @param {String} appToken - the application token
* @param {Handle} readerHandle - the reader handle
* @returns {Promise<()>}
*/
module.exports.closeReader = (appToken, readerHandle) => {
  return appTokens.getApp(appToken)
          .then((app) => imd_handles[readerHandle].close())
          .then(() => imd_handles = imd_handles.splice(writerHandle, 1));
}
