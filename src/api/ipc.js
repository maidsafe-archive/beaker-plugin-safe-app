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
  console.log("Auth request: ", req.uri);
  ipcTask.add(req.uri, cb);
  // if (ipcEvent.sender.send('webClientAuthReq', req) === true) {
  // 	return Promise.resolve();
  // }
  // return Promise.reject("Error sending authorization request");

  //	return Promise.resolve('safe-bmV0Lm1haWRzYWZlLmV4YW1wbGVzLm5vZGUtanMtdGVzdC1hcHA=:AAAAAWqJQyQAAAAAAAAAAAAAAAAAAAAgKf93dpDDH83rbPEHdv-yVOdp-5cg4e21sIQLStzgV1sAAAAAAAAAIPA9UirtY4gZnQACwRZubU5IXREkGWUHx4TlJnt6JxCCAAAAAAAAACCA-JC8S3piz2gh04Lf0bMtLKtiFuTcU5vyeI-QObssewAAAAAAAABAu5DnQCn6lFnPr_npQf6T_hWIDhSLKc1aVxALaH4m5YCA-JC8S3piz2gh04Lf0bMtLKtiFuTcU5vyeI-QObssewAAAAAAAAAgA3LD4n881Xay-rjwxL_nZuMFHnyvP7Pp99mhCP5__R4AAAAAAAAAIDGkCvw0Jcpfk0u8Fg1Choe1k58uGgN_ml8GdV8dxkjpAAAAAAAAACDvfcNpfSM6tcigyaGPXjbYhmZBawfZiIZ7oJ60D2EktwAAAAAAADqYAAAAAAAAABhBwlUCCCr3XDBzI5KPdTkxtlYAVxU5Kpo=');
};
