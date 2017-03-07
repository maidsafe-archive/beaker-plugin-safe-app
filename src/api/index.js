const app = require('./app');

module.exports = [
    {
        name: 'safe_app',
        isInternal: true,
        manifest: app.manifest,
        methods: app
    }
  ];
