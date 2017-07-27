const crypto = require('crypto'); // electron deps will be available inside browser
const { Readable } = require('stream');

const handles = new Map();

export const genRandomString = () => (crypto.randomBytes(32).toString('hex'));

const genObjHandle = (obj) => {
  const randHandle = genRandomString();
  handles.set(randHandle, obj);
  return randHandle;
};

export const genHandle = (app, netObj, groupId) => {
  let obj = {
    app,
    netObj, // this is null if the handle corresponds to a safeApp instance
    groupId // groupId is only set for safeApp instances
  };
  return genObjHandle(obj);
};

export const getObj = (handle) => {
  return new Promise((resolve, reject) => {
    const obj = handles.get(handle);
    if (obj) {
      return resolve(obj);
    }
    return reject(new Error('Invalid handle: ', handle));
  });
};

export const freeObj = (handle) => {
  const obj = handles.get(handle);
  if (obj) {
    handles.delete(handle);
    // Check if we are freeing a SAFEApp instance, if so, cascade the deletion
    // to all objects created with this SAFEApp instance.
    if (obj.netObj === null) {
      handles.forEach((value, key, map) => {
        if (obj.app === value.app) {
          // Current object was created with this SAFEApp instance,
          // thus let's free it too.
          freeObj(key);
        }
      });
      // Make sure that any resources allocated are freed, e.g. safe_app lib objects.
      if (obj.app.forceCleanUp) {
        try {
          obj.app.forceCleanUp();
        }
        catch(err) {
          // Since there was an error, assume the safeApp obj was not released,
          // restore it to the handles cache since it may be either used again
          // by the app, or we ned to try to free it at some point later.
          handles.set(handle, obj);
        }
      }
    } else {
      // Make sure that any resources allocated are freed, e.g. safe_app lib objects.
      if (obj.netObj.forceCleanUp) {
        obj.netObj.forceCleanUp();
      }
    }
  }
};

export const freePageObjs = (groupId) => {
  if (groupId !== null) {
    // Let's find all SAFEApp instances created under this groupId
    handles.forEach((value, key, map) => {
      if (value.groupId === groupId) {
        // Current SAFEApp instance was created in this page, thus let's free it
        // along with any other obects created with this SAFEApp instance.
        freeObj(key);
      }
    });
  }
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
    )
    .catch((err) => {
      setImmediate(() => {
        readable.emit('error', err)
        readable.push(null)
      })
    });
  return readable;
}

export const netStateCallbackHelper = (safeApp, appInfo, groupId) => {
  var readable = new Readable({ objectMode: true, read() {} })
  safeApp.initializeApp(appInfo, (state) => {
      setImmediate(() => {
        readable.push([state])
      })
    })
    .then((app) => {
      const token = genHandle(app, null, groupId); // We assign null to 'netObj' to signal this is a SAFEApp instance
      setImmediate(() => {
        readable.push([token])
      })
    })
    .catch((err) => {
      setImmediate(() => {
        readable.emit('error', err)
        readable.push(null)
      })
    });

  return readable;
}
