const { genHandle, getObj } = require('../helpers');

module.exports.manifest = {
  create: 'promise',
  fetch: 'promise',
  insert: 'promise',
  update: 'promise',
  getFileMeta: 'sync'
};

module.exports.create = (appToken, nfsHandle, content) => {
  return getObj(appToken)
    .then(() => getObj(nfsHandle))
    .then((nfs) => nfs.create(content))
    .then(genHandle);
};

module.exports.fetch = (appToken, nfsHandle, fileName) => {
  return getObj(appToken)
    .then(() => getObj(nfsHandle))
    .then((nfs) => nfs.fetch(fileName))
    .then(genHandle);
};

module.exports.insert = (appToken, nfsHandle, fileHandle, fileName) => {
  return getObj(appToken)
    .then(() => getObj(nfsHandle))
    .then((nfs) => {
      return getObj(fileHandle).then((file) => nfs.insert(fileName, file));
    })
    .then(() => fileHandle);
};

module.exports.update = (appToken, nfsHandle, fileHandle, fileName, version) => {
  return getObj(appToken)
    .then(() => getObj(nfsHandle))
    .then((nfs) => {
      return getObj(fileHandle).then((file) => nfs.update(fileName, file, version));
    })
    .then(() => fileHandle);
};

module.exports.getFileMeta = (fileHandle) => {
  return getObj(fileHandle).then((file) => (
    {
      dataMapName: file.dataMapName,
      created: file.created,
      modified: file.modified,
      size: file.size,
      version: file.version
    }
  ));
};
