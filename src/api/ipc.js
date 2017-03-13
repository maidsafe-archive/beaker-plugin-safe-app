const crypto = require('crypto'); // electron deps will be avaible inside browser
const ipcMain = require('electron').ipcMain; // electron deps will be avaible inside browser

const genRandomToken = () => (crypto.randomBytes(32).toString('hex'));

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
    const token = genRandomToken();
    this.tasks.push(token);
    this.tasksInfo[token] = { info, cb };
    this.next();
  }

  remove() {
    const index = this.tasks.indexOf(this.currentTaskId);
    this.tasks.splice(index, 1);
    delete this.tasksInfo[this.currentTaskId];
    this.isProcessing = false;
    return this;
  }

  next() {
    if (this.isProcessing || this.tasks.length === 0) {
      return
    }
    this.isProcessing = true;
    this.currentTaskId = this.tasks[0];
    this.currentTaskInfo = this.tasksInfo[this.currentTaskId].info;
    this.currentTaskCb = this.tasksInfo[this.currentTaskId].cb;
    ipcEvent.sender.send('webClientAuthReq', this.currentTaskInfo);
  }
}

const ipcTask = new IpcTask();

let ipcEvent = null;

ipcMain.on('registerSafeApp', (event) => {
  ipcEvent = event;
  console.log("registerSafeApp: ", ipcEvent);
});

ipcMain.on('webClientContainerRes', (event, res) => {
	// handle response
  console.log("webClientContainerRes");
  if (typeof ipcTask.currentTaskCb === 'function') {
    ipcTask.currentTaskCb(null, res);
  }
  ipcTask.remove().next();
});

ipcMain.on('webClientAuthRes', (event, res) => {
  // handle response
  console.log("webClientAuthRes");
  if (typeof ipcTask.currentTaskCb === 'function') {
    ipcTask.currentTaskCb(null, res);
  }
  ipcTask.remove().next();
});

ipcMain.on('webClientErrorRes', (event, err) => {
  // handle Error
  console.log("webClientErrorRes");
  if (typeof ipcTask.currentTaskCb === 'function') {
    ipcTask.currentTaskCb(err);
  }
  ipcTask.remove().next();
});

module.exports.sendAuthReq = (req, cb) => {
  ipcTask.add(req.uri, cb);
};
