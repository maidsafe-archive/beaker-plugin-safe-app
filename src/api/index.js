const app = require('./app');

module.exports = [
    {
        name: 'app',
        isInternal: true,
        manifest: app.manifest,
        methods: app
    }
  ];
