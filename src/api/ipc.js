/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
const ipcMain = require('electron').ipcMain; // electron deps will be avaible inside browser
/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved */
const { genRandomString, freePageObjs } = require('./helpers');

let ipcEvent = null;

class IpcTask {
  constructor() {
    this.tasks = [];
    this.tasksInfo = {};
    this.isProcessing = false;
    this.currentTaskId = null;
    this.currentTaskInfo = null;
    this.currentTaskCb = null;
  }

  add(info, unregistered, cb) {
    const handle = genRandomString();
    this.tasks.push(handle);
    this.tasksInfo[handle] = { info, unregistered, cb };
    this.next();
  }

  remove() {
    const index = this.tasks.indexOf(this.currentTaskId);
    if (index === -1) {
      return this;
    }
    this.tasks.splice(index, 1);
    delete this.tasksInfo[this.currentTaskId];
    this.isProcessing = false;
    this.currentTaskId = null;
    this.currentTaskInfo = null;
    this.currentTaskCb = null;
    return this;
  }

  next() {
    if (this.isProcessing || this.tasks.length === 0) {
      return;
    }
    this.isProcessing = true;
    this.currentTaskId = this.tasks[0];
    const currentTask = this.tasksInfo[this.currentTaskId];
    this.currentTaskInfo = currentTask.info;
    this.currentTaskCb = currentTask.cb;
    ipcEvent.sender.send('webClientAuthReq', this.currentTaskInfo, currentTask.unregistered);
  }
}

const ipcTask = new IpcTask();

ipcMain.on('onTabRemove', (event, safeAppGroupId) => {
  freePageObjs(safeAppGroupId);
});

ipcMain.on('onTabUpdate', (event, safeAppGroupId) => {
  freePageObjs(safeAppGroupId);
});

ipcMain.on('registerSafeApp', (event) => {
  ipcEvent = event;
});

ipcMain.on('webClientContainerRes', (event, res) => {
  // handle response
  if (typeof ipcTask.currentTaskCb === 'function') {
    ipcTask.currentTaskCb(null, res);
  }
  ipcTask.remove().next();
});

ipcMain.on('webClientAuthRes', (event, res) => {
  // handle response
  if (typeof ipcTask.currentTaskCb === 'function') {
    ipcTask.currentTaskCb(null, res);
  }
  ipcTask.remove().next();
});

ipcMain.on('webClientSharedMDataRes', function (event, res) {
  // handle response
  if (typeof ipcTask.currentTaskCb === 'function') {
    ipcTask.currentTaskCb(null, res);
  }
  ipcTask.remove().next();
});

ipcMain.on('webClientErrorRes', (event, err) => {
  // handle Error

  if (err && err.toLowerCase() === 'unauthorised') {
    return;
  }

  if (typeof ipcTask.currentTaskCb === 'function') {
    ipcTask.currentTaskCb(err);
  }
  ipcTask.remove().next();
});

module.exports.sendAuthReq = (req, unregistered, cb) => {
  // The unregistered flag is used to handle the requests in a separate queue
  // from the one for registered requests, so they can be procssed in parallel.
  ipcTask.add(req.uri, unregistered, cb);
};
