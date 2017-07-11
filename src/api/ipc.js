/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
const ipcMain = require('electron').ipcMain; // electron deps will be avaible inside browser
/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved */
const genRandomString = require('./helpers').genRandomString;

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

  add(info, cb) {
    const token = genRandomString();
    this.tasks.push(token);
    this.tasksInfo[token] = { info, cb };
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
    this.currentTaskInfo = this.tasksInfo[this.currentTaskId].info;
    this.currentTaskCb = this.tasksInfo[this.currentTaskId].cb;
    ipcEvent.sender.send('webClientAuthReq', this.currentTaskInfo);
  }
}

const ipcTask = new IpcTask();

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

module.exports.sendAuthReq = (req, cb) => {
  ipcTask.add(req.uri, cb);
};
