const path = require('path');
const safeApp = require('safe-app');
const urlParse = require('url').parse;
const mime = require('mime');
const ipc = require('./api/ipc');
/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
const protocol = require('electron').protocol;

const winston = require('./winston-config');

const safeScheme = 'safe';
const safeLocalScheme = 'localhost';

const appInfo = {
  id: 'net.maidsafe.app.browser',
  name: 'SAFE Browser',
  vendor: 'MaidSafe'
};

let appObj = null;

const authoriseApp = () => {
  return new Promise((resolve, reject) => {
    if (appObj) {
      return resolve(true);
    }
    return safeApp.initializeApp(appInfo)
      .then((app) => app.logPath()
        .then((filePath) => {
          global.winston = winston(filePath);
          return app.auth.genConnUri()
            .then((connReq) => ipc.sendAuthReq(connReq, (err, res) => {
              if (err) {
                return reject(new Error('Unable to get connection information: ', err));
              }
              return app.auth.loginFromURI(res)
                .then((app) => {
                  appObj = app;
                  resolve(true);
                });
            }))
        })
    );
  })
};

const fetchData = (url) => {
  if (!appObj) {
    return Promise.reject(new Error('Must login to Authenticator for viewing SAFE sites'));
  }
  return appObj.webFetch(url)
};


const handleError = (err) => {
  if (mimeType === 'html') {
    return cb({ mimeType, data: err.message });
  }
  cb(null);
};


const registerSafeLocalProtocol = () => {
  protocol.registerHttpProtocol(safeLocalScheme, (req, cb) => {
    const parsed = urlParse(req.url);

    if (!parsed.host) { return; }

    const path = parsed.pathname;
    const port = parsed.port;
    const newUrl = `http://localhost:${port}${path}`;

    cb({ url: newUrl });
  });
};

const registerSafeProtocol = () => {
  protocol.registerBufferProtocol(safeScheme, (req, cb) => {
    const parsedUrl = urlParse(req.url);
    const fileExt = path.basename(parsedUrl.pathname) || 'html';
    const mimeType = mime.lookup(fileExt);

    authoriseApp()
      .then(() => fetchData(req.url))
      .then((co) => cb({ mimeType, data: co }))
      .catch(handleError);
  }, (err) => {
    if (err) console.error('Failed to register protocol');
  });
};

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
}];
