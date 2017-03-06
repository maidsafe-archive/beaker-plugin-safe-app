//const safeApp = require('safe-app');
const urlParse = require('url').parse;
const mime = require('mime');
/* eslint-disable import/extensions */
const protocol = require('electron').protocol;
/* eslint-enable import/extensions */

const safeScheme = 'safe-app';

const registerSafeAppProtocol = () => {
  protocol.registerBufferProtocol(safeScheme, (req, cb) => {
    const parsedUrl = urlParse(req.url);
    const fileExt = parsedUrl.pathname.split('/').slice(-1)[0].split('.')[1] || 'html';
    console.log("fileExt: ", fileExt);
    console.log("parsedUrl: ", parsedUrl);
    cb({ mimeType: 'text/html', data: new Buffer('<h1>Example</h1>') });
  }, (err) => {
    if (err) console.error('Failed to register protocol');
  });
};

module.exports = {
  scheme: safeScheme,
  label: 'SAFE App scheme - testing',
  isStandardURL: true,
  isInternal: true,
  register: registerSafeAppProtocol
};
