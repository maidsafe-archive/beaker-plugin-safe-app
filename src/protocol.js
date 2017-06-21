const path = require('path');
const safeApp = require('safe-app');
const urlParse = require('url').parse;
const mime = require('mime');
const ipc = require('./api/ipc');
/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
const protocol = require('electron').protocol;
/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved */

const safeScheme = 'safe';

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
      .then((app) => app.auth.genConnUri()
        .then((connReq) => ipc.sendAuthReq(connReq, (err, res) => {
          if (err) {
            return reject(new Error('Unable to get connection information: ', err));
          }
          return app.auth.loginFromURI(res)
            .then((app) => {
              appObj = app;
              resolve(true);
            });
        })));
  })
};

const fetchData = (url) => {
  if (!appObj) {
    return Promise.reject(new Error('Must login to Authenticator for viewing SAFE sites'));
  }
  return appObj.webFetch(url)
    .then((f) => appObj.immutableData.fetch(f.dataMapName))
    .then((i) => i.read());
};

const registerSafeAuthProtocol = () => {
  protocol.registerBufferProtocol(safeScheme, (req, cb) => {
    const parsedUrl = urlParse(req.url);
    const fileExt = path.basename(parsedUrl.pathname) || 'html';
    const mimeType = mime.lookup(fileExt);
    const handleError = (err) => {
      if (mimeType === 'html') {
        return cb({ mimeType, data: err.message });
      }
      cb(null);
    };

    authoriseApp()
      .then(() => fetchData(req.url))
      .then((co) => cb({ mimeType, data: co }))
      .catch(handleError);
  }, (err) => {
    if (err) console.error('Failed to register protocol');
  });
};

module.exports = {
  scheme: safeScheme,
  label: 'SAFE',
  isStandardURL: true,
  isInternal: true,
  register: registerSafeAuthProtocol
};
