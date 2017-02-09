const safeApp = require('safe-app');
/* eslint-disable import/extensions */
const protocol = require('electron').protocol;
/* eslint-enable import/extensions */

const safeScheme = 'safe';

const authoriseApp = () => {
  return safeApp.initializeApp(appInfo)
    .then(app => app.auth.connectUnregistered());
};

const appObj = authoriseApp();

const registerSafeAuthProtocol = () => {
  protocol.registerBufferProtocol(safeAuthScheme, (req, cb) => {
    appObj.webFetch(req.url)
      .then((f) => app.immutableData.fetch(f.dataMapName))
      .then((i) => i.read())
      .then((co) => cb({ mimeType: 'text/html', data: co }));
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
