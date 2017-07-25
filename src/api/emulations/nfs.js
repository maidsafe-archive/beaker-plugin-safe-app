const { genHandle, getObj, freeObj } = require('../helpers');

module.exports.manifest = {
  create: 'promise',
  fetch: 'promise',
  insert: 'promise',
  update: 'promise',
  getFileMeta: 'promise',
  free: 'sync',
  freeFile: 'sync'
};

/**
 * Create a new file with the given content, put the content
 * on the network via ImmutableData (public) and wrap it into a File.
 * @name window.safeNfs.create
 *
 * @param {NFSHandle} nfsHandle the NFS emulation handle
 * @param {(String|Buffer)} content
 *
 * @returns {Promise<FileHandle>} the File handle of a newly created file
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
 * @returns {Promise<FileHandle>} the handle of the File found for that path
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
 * @returns {Promise<FileHandle>} the same File handle
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
 * @returns {Promise<FileHandle>} the same File handle
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
 * @param {FileHandle} fileHandle the File handle
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
