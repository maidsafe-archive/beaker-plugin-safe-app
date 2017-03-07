//const safe_app = require('safe-app');

module.exports = {
  manifest: {
    fromAuthUri: 'promise',
  },
  auth: {
    fromAuthUri: (id) => {return Promise.resolve(id);}//safe_app.SAFEApp.fromAuthUri
  }
};
