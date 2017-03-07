const auth = require('./auth');
//const safe_app = require('safe-app');

module.exports = [
    {
        name: 'auth',
        isInternal: true,
        manifest: auth.manifest,
        methods: auth.auth
    }
  ];
