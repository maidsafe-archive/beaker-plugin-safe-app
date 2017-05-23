const crypto = require('crypto'); // electron deps will be available inside browser
const { Readable } = require('stream');

const handles = new Map();

export const genRandomString = () => (crypto.randomBytes(32).toString('hex'));

const genObjHandle = (obj) => {
  const randHandle = genRandomString();
  handles.set(randHandle, obj);
  return randHandle;
};

export const genHandle = (app, netObj) => {
  let obj = {
    app,
    netObj
  };
  return genObjHandle(obj);
};

export const getObj = (handle) => {
  return new Promise((resolve, reject) => {
    const obj = handles.get(handle);
    if (obj) {
      return resolve(obj);
    }
    return reject(new Error('Invalid handle'));
  });
};

export const freeObj = (handle) => {
  handles.delete(handle);
};

export const forEachHelper = (containerHandle, sendHandles) => {
  var readable = new Readable({ objectMode: true, read() {} })
  getObj(containerHandle)
    .then((obj) => obj.netObj.forEach((arg1, arg2) => {
        setImmediate(() => {
          if (sendHandles) {
            arg1 = genHandle(obj.app, arg1);
          }
          let args = [arg1];
          if (arg2) {
            if (sendHandles) {
              arg2 = genHandle(obj.app, arg2);
            }
            args.push(arg2);
          }
          readable.push(args)
        })
      })
      .then(() => {
        setImmediate(() => {
          readable.push(null)
        })
      })
    );
  return readable;
}
