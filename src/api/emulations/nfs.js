const { genHandle, getObj } = require('../handles');

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
    .then((nfs) => nfs.insert(fileName, getObj(fileHandle)))
    .then(() => fileHandle);
};

module.exports.update = (appToken, nfsHandle, fileHandle, fileName, version) => {
  return getObj(appToken)
    .then(() => getObj(nfsHandle))
    .then((nfs) => nfs.update(fileName, getObj(fileHandle), version))
    .then(() => fileHandle);
};

module.exports.getFileMeta = (fileHandle) => {
  const file = getObj(fileHandle);
  return {
    dataMapName: file.dataMapName,
    created: file.created,
    modified: file.modified,
    size: file.size,
    version: file.version
  };
};
