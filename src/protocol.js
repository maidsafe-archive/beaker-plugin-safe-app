const safeApp = require('safe-app');
const urlParse = require('url').parse;
const mime = require('mime');
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

const authoriseApp = (scope) => {
  if (appObj) {
    return Promise.resolve(true);
  }

  appInfo.scope = scope;
  return safeApp.initializeApp(appInfo)
    .then((app) => app.auth.connectUnregistered())
    .then((app) => (appObj = app));
};

const fetchData = (url) => {
  if (!appObj) {
    return Promise.reject(new Error('Unable to create unregistered client'));
  }
  return appObj.webFetch(url)
    .then((f) => appObj.immutableData.fetch(f.dataMapName))
    .then((i) => i.read());
};

const registerSafeAuthProtocol = () => {
  protocol.registerBufferProtocol(safeScheme, (req, cb) => {
    const parsedUrl = urlParse(req.url);
    const fileExt = parsedUrl.pathname.split('/').slice(-1)[0].split('.')[1] || 'html';
    const mimeType = mime.lookup(fileExt);
    const handleError = (err) => {
      if (mimeType === 'html') {
        return cb({ mimeType, data: err.message });
      }
      cb(null);
    };

    // Provide the hostname as the scope for the app authorisation
    authoriseApp(parsedUrl.hostname)
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
