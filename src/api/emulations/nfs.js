const { genHandle, getObj, freeObj } = require('../helpers');

module.exports.manifest = {
  create: 'promise',
  fetch: 'promise',
  insert: 'promise',
  update: 'promise',
  getFileMeta: 'promise',
  free: 'sync'
};

module.exports.create = (nfsHandle, content) => {
  return getObj(nfsHandle)
    .then((obj) => obj.netObj.create(content)
      .then((imd) => genHandle(obj.app, imd)));
};

module.exports.fetch = (nfsHandle, fileName) => {
  return getObj(nfsHandle)
    .then((obj) => obj.netObj.fetch(fileName)
      .then((imd) => genHandle(obj.app, imd)));
};

module.exports.insert = (nfsHandle, fileHandle, fileName) => {
  return getObj(nfsHandle)
    .then((nfsObj) => getObj(fileHandle)
      .then((fileObj) => nfsObj.netObj.insert(fileName, fileObj.netObj))
    )
    .then(() => fileHandle);
};

module.exports.update = (nfsHandle, fileHandle, fileName, version) => {
  return getObj(nfsHandle)
    .then((nfsObj) => getObj(fileHandle)
      .then((fileObj) => nfsObj.netObj.update(fileName, fileObj.netObj, version))
    )
    .then(() => fileHandle);
};

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
 * Free the File instance from memory
 * @param {String} fileHandle - the File handle
 */
module.exports.free = (fileHandle) => freeObj(fileHandle);
