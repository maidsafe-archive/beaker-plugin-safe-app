const crypto = require('crypto'); // electron deps will be available inside browser
const { Readable } = require('stream');

const handles = new Map();

export const genRandomString = () => (crypto.randomBytes(32).toString('hex'));

export const genHandle = (obj) => {
  const randHandle = genRandomString();
  handles.set(randHandle, obj);
  return randHandle;
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

export const forEachHelper = (appToken, containerHandle, sendHandles) => {
  var readable = new Readable({ objectMode: true, read() {} })
  getObj(appToken)
    .then(() => getObj(containerHandle))
    .then((container) => container.forEach((arg1, arg2) => {
        setImmediate(() => {
          if (sendHandles) {
            arg1 = genHandle(arg1);
          }
          let args = [arg1];
          if (arg2) {
            if (sendHandles) {
              arg2 = genHandle(arg2);
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
