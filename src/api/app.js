const safe_app = require('safe-app');

module.exports.manifest = {
  SAFEApp: 'sync',
};

module.exports.SAFEApp = safe_app.app;
