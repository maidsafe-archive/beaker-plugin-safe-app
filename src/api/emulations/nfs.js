const { genHandle, getObj, freeObj } = require('../helpers');

// File-open constants
const OPEN_MODE_OVERWRITE = 1;
const OPEN_MODE_APPEND = 2;
const OPEN_MODE_READ = 4;
const FILE_READ_FROM_BEGIN = 0;
const FILE_READ_TO_END = 0;

module.exports.manifest = {
  create: 'promise',
  fetch: 'promise',
  insert: 'promise',
  update: 'promise',
  getFileMeta: 'promise',
  free: 'sync',
  freeFile: 'sync',
  open: 'promise',
  size: 'promise',
  read: 'promise',
  write: 'promise',
  close: 'promise'
};

/**
 * Helper function to create, write to file, and commit to network
 * @name window.safeNfs.create
 *
 * @param {NFSHandle} nfsHandle the NFS emulation handle
 * @param {(String|Buffer)} content
 *
 * @returns {Promise<File>}
 **/
module.exports.create = (nfsHandle, content) => {
  return getObj(nfsHandle)
    .then((obj) => obj.netObj.create(content)
      .then((fileCtx) => genHandle(obj.app, fileCtx)));
};

/**
 * Find the file of the given filename (aka keyName in the MutableData)
 * @name window.safeNfs.fetch
 *
 * @param {NFSHandle} nfsHandle the NFS emulation handle
 * @param {String} fileName - the path/file name
 *
 * @returns {Promise<FileContextHandle>} the handle of the File found for that path
 **/
module.exports.fetch = (nfsHandle, fileName) => {
  return getObj(nfsHandle)
    .then((obj) => obj.netObj.fetch(fileName)
      .then((fileCtx) => genHandle(obj.app, fileCtx)));
};

/**
 * Insert the given file into the underlying MutableData, directly commit
 * to the network.
 * @name window.safeNfs.insert
 *
 * @param {NFSHandle} nfsHandle the NFS emulation handle
 * @param {FileHandle} fileHandle the handle of the File to serialise and store
 * @param {(String|Buffer)} fileName the path to store the file under
 *
 * @returns {Promise<FileContextHandle>} the same File handle
 **/
module.exports.insert = (nfsHandle, fileHandle, fileName) => {
  return getObj(nfsHandle)
    .then((nfsObj) => getObj(fileHandle)
      .then((fileObj) => nfsObj.netObj.insert(fileName, fileObj.netObj))
    )
    .then(() => fileHandle);
};

/**
 * Replace a path with a new file. Directly commit to the network.
 * @name window.safeNfs.update
 *
 * @param {NFSHandle} nfsHandle the NFS emulation handle
 * @param {FileHandle} fileHandle the handle of the File to serialise and store
 * @param {(String|Buffer)} fileName - the path to store the file under
 * @param {Number} version the version successor, to ensure you
         are overwriting the right one
 * @returns {Promise<FileContextHandle>} the same File handle
 **/
module.exports.update = (nfsHandle, fileHandle, fileName, version) => {
  return getObj(nfsHandle)
    .then((nfsObj) => getObj(fileHandle)
      .then((fileObj) => nfsObj.netObj.update(fileName, fileObj.netObj, version))
    )
    .then(() => fileHandle);
};

/**
 * @name FileMetadata
 * @typedef {Object} FileMetadata
 * @param {Buffer} dataMapName The XorName where to read the immutable data at
 * @param {Date} created When was this created? in UTC
 * @param {Date} modified When was this last modified? in UTC
 * @param {Number} size How big is that file?
 * @param {Number} version Which version was this? Equals the underlying MutableData's entry version
 **/

/**
 * Retrieve the file's metadata.
 * @name window.safeNfs.getFileMeta
 *
 * @param {FileContextHandle} fileHandle the File handle
 *
 * @returns {FileMetadata} the file's metadata
 **/
module.exports.getFileMeta = (fileHandle) => {
  return getObj(fileHandle).then((obj) => (
    {
      dataMapName: obj.netObj.dataMapName,
      created: obj.netObj.created,
      modified: obj.netObj.modified,
      size: obj.netObj.size,
      version: obj.netObj.version
    }
  ))
};

/**
 * Free the NFS emulation instance from memory
 * @name window.safeNfs.free
 *
 * @param {NFSHandle} nfsHandle the NFS emulation handle
 **/
module.exports.free = (nfsHandle) => freeObj(nfsHandle);

/**
 * Free the File instance from memory
 * @name window.safeNfs.freeFile
 *
 * @param {FileHandle} fileHandle the File handle
 **/
module.exports.freeFile = (fileHandle) => freeObj(fileHandle);

// QUESTION: Separation of NFS and File class methods in safe_app_nodejs /
// helps to make sense of each grouping of functions.
// Are these additions confusing or clear?

/**
* Opens a given file, or creates a new file if none is given
* Does not commit file to network
* @name window.safeNfs.open
*
* @param {File} file
* @param {Number} openMode
* @returns {FileContextHandle} the file context handle of a newly created file
**/
module.exports.open = (file, openMode) => {
  return obj.netObj.open(file, openMode)
  .then((fileCtx) => genHandle(obj.app, fileCtx));
};


/**
* Write to file that's opened in write or append mode
* @name window.safeNfs.write
*
* @param {FileContextHandle} fileContextHandle
* @param {String|Buffer} content
*
* @returns {Promise} the File handle of a newly created file
**/
module.exports.write = (fileContextHandle, content) => {
  return getObj(fileContextHandle)
  .then((obj) => obj.netObj.write(content));
};



/**
* Close file, thereby committing it to the network
* @name window.safeNfs.close
*
* @param {FileContextHandle} fileContextHandle the NFS emulation handle
*
* @returns {Promise}
**/
module.exports.close = (fileContextHandle) => {
  return getObj(fileContextHandle)
  // QUESTION: Should we also free handle here? Or leave it to be freed separately?
  //freeObj(fileContextHandle) ?
  .then((obj) => obj.netObj.close());
};

/**
* Get the byte size of a file
* @name window.safeNfs.size
*
* @param {FileContextHandle} fileContextHandle
*
* @returns {Number} the File handle of a newly created file
**/
module.exports.size = (fileContextHandle) => {
  return getObj(fileContextHandle)
  .then((obj) => obj.netObj.size())
  .then((int) => int);
};

/**
 * @name NFSHandle
 * @typedef {String} NFSHandle
 * @description Holds the reference to a NFS emulation instance.
 * Note that it is required to free the memory used by such an instance when it's
 * not needed anymore by the client aplication, please refer to the `free` function.
 **/

/**
 * @name FileHandle
 * @typedef {String} FileHandle
 * @description Holds the reference to a File instance.
 * Note that it is required to free the memory used by such an instance when it's
 * not needed anymore by the client aplication, please refer to the `freeFile` function.
 **/
