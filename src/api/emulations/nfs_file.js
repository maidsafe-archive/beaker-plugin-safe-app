const { genHandle, getObj, freeObj } = require('../helpers');

module.exports.manifest = {
  size: 'promise',
  read: 'promise',
  write: 'promise',
  close: 'promise',
  metadata: 'promise'
};

/**
 * Get current file size
 * @name window.safeNfsFile.size
 *
 * @param {FileHandle} fileHandle the File handle
 *
 * @returns {Promise<Number>} the file size
 **/
module.exports.size = (fileHandle) => {
  return getObj(fileHandle)
    .then((obj) => obj.netObj.size());
};

/**
 * Read content from the file
 * @name window.safeNfsFile.read
 *
 * @param {FileHandle} fileHandle the File handle
 * @param {Number} position
 * @param {Number} len
 *
 * @returns {Promise<[Data, Size]>}
 **/
module.exports.read = (fileHandle, position, len) => {
  return getObj(fileHandle)
    .then((obj) => obj.netObj.read(position, len));
};

/**
* Write content into the file
* @name window.safeNfsFile.write
*
* @param {FileHandle} fileHandle the File handle
* @param {Buffer|String} content
*
* @returns {Promise}
**/
module.exports.write = (fileHandle, content) => {
  return getObj(fileHandle)
    .then((obj) => obj.netObj.write(content));
};

/**
* Close the file, this will commit the content to the network.
* @name window.safeNfsFile.close
*
* @param {FileHandle} fileHandle the File handle
*
* @returns {Promise}
**/
module.exports.close = (fileHandle) => {
  return getObj(fileHandle)
    .then((obj) => obj.netObj.close());
};

/**
 * @name FileMetadata
 * @typedef {Object} FileMetadata
 * @param {Buffer} dataMapName The XorName where to read the immutable data at
 * @param {Date} created When was this created? in UTC
 * @param {Date} modified When was this last modified? in UTC
 * @param {Number} version Which version was this? Equals the underlying MutableData's entry version
 **/

/**
 * Retrieve the file's metadata.
 * @name window.safeNfsFile.metadata
 *
 * @param {FileHandle} fileHandle the File handle
 *
 * @returns {FileMetadata} the file's metadata
 **/
module.exports.metadata = (fileHandle) => {
  return getObj(fileHandle).then((obj) => (
    {
      dataMapName: obj.netObj.dataMapName,
      created: obj.netObj.created,
      modified: obj.netObj.modified,
      version: obj.netObj.version
    }
  ))
};

/**
 * @name FileHandle
 * @typedef {String} FileHandle
 * @description Holds the reference to a File instance.
 * Note that it is required to free the memory used by such an instance when it's
 * not needed anymore by the client aplication, please refer to the `free` function.
 **/
