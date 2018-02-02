import { setupSafeLogProtocol } from './safe-logs';

const safeApp = require('@maidsafe/safe-node-app');
const urlParse = require('url').parse;
const ipc = require('./api/ipc');
const ipcMain = require('electron').ipcMain; // electron deps will be avaible inside browser

/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
const protocol = require('electron').protocol;
const app = require('electron').app;

const errorTemplate = require('./error-template.ejs');
const safeCss = require('./safe-pages.css');

const safeScheme = 'safe';
const safeLocalScheme = 'localhost';
const safeLogScheme = 'safe-logs';

const isDevMode = process.execPath.match(/[\\/]electron/);

const appInfo = {
  id: 'net.maidsafe.app.browser.safe-app-plugin',
  name: 'SAFE App Browser Plugin',
  vendor: 'MaidSafe.net Ltd',
  customExecPath: isDevMode ? [process.execPath, app.getAppPath()] : [app.getPath('exe')]
};

// OSX: Add bundle for electron in dev mode
if (isDevMode && process.platform === 'darwin') {
  appInfo.bundle = 'com.github.electron';
}


let sendToShellWindow = null;
let appObj = null;


ipcMain.on('safeReconnectApp', () => {
  sendToShellWindow('command', 'log', 'Received reconnect call: ', appObj);

  if (appObj && appObj.networkState === 'Disconnected') {
    appObj.reconnect();
  }
});

const netStateChange = (state) => {
  if (sendToShellWindow) {
    sendToShellWindow('command', 'log', 'Network state changed to: ', state);

    sendToShellWindow('safeAppConnectionChange', state);
  }
};

const initialiseSafeApp = () => new Promise((resolve, reject) => {
  if (appObj) {
    return resolve();
  }
  const opts = {
    registerScheme: false,
    joinSchemes: [safeScheme]
  };
  return safeApp.initializeApp(appInfo, netStateChange, opts)
    .then((newApp) => {
      appObj = newApp;
      return resolve();
    })
    .catch(reject);
});

const connectSafeApp = () => new Promise((resolve, reject) => {
  if (!appObj) {
    return reject(new Error('Unexpected error. SAFE App library not initialised'));
  } else if (appObj.networkState === 'Init') {
    return appObj.auth.genConnUri()
      .then((connReq) => ipc.sendAuthReq(connReq, true, (err, res) => {
        if (err) {
          return reject(new Error('Unable to get connection information: ', err));
        }
        return appObj.auth.loginFromURI(res)
          .then(() => resolve());
      }));
  }
  resolve();
});

const fetchData = (url) => appObj.webFetch(url);

const handleError = (err, mimeType, cb) => {
  const errObj = Object.assign({}, err);
  errObj.css = safeCss;

  const page = errorTemplate(errObj);

  if (mimeType === 'text/html') {
    return cb({ mimeType, data: new Buffer(page) });
  }
  return cb({ mimeType, data: new Buffer(errObj.message) });
};


const registerSafeLocalProtocol = () => {
  protocol.registerHttpProtocol(safeLocalScheme, (req, cb) => {
    const parsed = urlParse(req.url);

    if (!parsed.host) { return; }

    const urlPath = parsed.pathname;
    const port = parsed.port;
    const newUrl = `http://localhost:${port}${urlPath}`;

    cb({ url: newUrl });
  });
};

/**
 * Handle registering of protocol in beaker. Accepts sendToShellWindow as
 * function to enable plugin comms with the ipcRenderer current shell window.
 * @param  { Func } sendToShell function for ipc comms with shell window
 */
const registerSafeProtocol = (sendToShell) => {
  if (sendToShell) {
    sendToShellWindow = sendToShell;
  }
  return initialiseSafeApp().then(() => {
    protocol.registerBufferProtocol(safeScheme, (req, cb) => {
      connectSafeApp()
        .then(() => fetchData(req.url))
        .then((data) => cb({ mimeType: data.headers['Content-Type'], data: data.body }))
        .catch((err) => handleError(err, 'text/html', cb));
    }, (err) => {
      if (err) console.error('Failed to register protocol');
    });
  });
};

/* eslint-disable max-len, import/prefer-default-export */
export const registerSafeLogs = () => initialiseSafeApp().then(() => setupSafeLogProtocol(appObj));
/* eslint-enable  */

module.exports = [{
  scheme: safeScheme,
  label: 'SAFE',
  isStandardURL: true,
  isInternal: true,
  register: registerSafeProtocol
}, {
  scheme: safeLocalScheme,
  label: 'SAFE-localhost',
  isStandardURL: true,
  isInternal: true,
  register: registerSafeLocalProtocol
},
{
  scheme: safeLogScheme,
  label: 'SAFE-logs',
  register: registerSafeLogs
}];
