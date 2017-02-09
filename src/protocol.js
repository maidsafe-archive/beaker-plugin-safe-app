const safeApp = require('safe-app');
/* eslint-disable import/extensions */
const protocol = require('electron').protocol;
/* eslint-enable import/extensions */

const safeScheme = 'safe';

const appInfo = {
  'id': 'net.maidsafe.examples.webclient',
  'name': 'Safe app - web client',
  'vendor': 'MaidSafe.net Ltd.'
};

let appObj = null;

const authoriseApp = () => {
  if (appObj) {
    return Promise.resolve(true);
  }
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
    .then((i) => i.read())
};

const registerSafeAuthProtocol = () => {
  protocol.registerBufferProtocol(safeScheme, (req, cb) => {
    authoriseApp()
      .then(() => fetchData(req.url))
      .then((co) => cb({ mimeType: 'text/html', data: co }))
      .catch(console.error);
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
