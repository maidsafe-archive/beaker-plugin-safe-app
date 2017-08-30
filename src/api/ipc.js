/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
const ipcMain = require('electron').ipcMain; // electron deps will be avaible inside browser
/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved */
const { genRandomString, freePageObjs } = require('./helpers');

let ipcEvent = null;

class AuthRequest {
  constructor(uri, isUnRegistered, cb) {
    this.id = genRandomString();
    this.uri = uri;
    this.isUnRegistered = isUnRegistered;
    this.cb = cb;
    this.res = null;
    this.error = null;
  }
}

class IpcTask {
  constructor() {
    this.tasks = [];
    this.tasksInfo = {};
    this.isProcessing = false;
  }

  add(req) {
    this.tasks.push(req.id);
    this.tasksInfo[req.id] = req;
    this.next();
  }

  remove(id) {
    const index = this.tasks.indexOf(id);
    if (index === -1) {
      return this;
    }
    this.tasks.splice(index, 1);
    delete this.tasksInfo[id];
    this.isProcessing = false;
    return this;
  }

  next() {
    if (this.isProcessing || this.tasks.length === 0) {
      return;
    }
    this.isProcessing = true;
    const reqId = this.tasks[0];
    const currentTask = this.tasksInfo[reqId];
    ipcEvent.sender.send('webClientAuthReq', currentTask);
  }
}

const ipcTask = new IpcTask();

const authRes = (event, response) => {
  const reqId = response.id;
  const task = ipcTask.tasksInfo[reqId];
  if (!task) {
    return;
  }
  // handle response
  if (typeof task.cb === 'function') {
    task.cb(null, response.res);
  }
  ipcTask.remove(reqId).next();
};

ipcMain.on('onTabRemove', (event, safeAppGroupId) => {
  freePageObjs(safeAppGroupId);
});

ipcMain.on('onTabUpdate', (event, safeAppGroupId) => {
  freePageObjs(safeAppGroupId);
});

ipcMain.on('registerSafeApp', (event) => {
  ipcEvent = event;
});

ipcMain.on('webClientContainerRes', authRes);

ipcMain.on('webClientAuthRes', authRes);

ipcMain.on('webClientSharedMDataRes', authRes);

ipcMain.on('webClientErrorRes', (event, res) => {
  // handle Error
  const err = res.error;
  if (err && err.toLowerCase() === 'unauthorised') {
    return;
  }

  const reqId = res.id;
  const task = ipcTask.tasksInfo[reqId];
  if (!task) {
    return;
  }
  if (typeof task.cb === 'function') {
    task.cb(err);
  }
  ipcTask.remove(reqId).next();
});

module.exports.sendAuthReq = (req, unregistered, cb) => {
  // The unregistered flag is used to handle the requests in a separate queue
  // from the one for registered requests, so they can be procssed in parallel.
  ipcTask.add(new AuthRequest(req.uri, unregistered, cb));
};
