const app = require('./app');
const mdata = require('./mutable_data');

module.exports = [
    {
        name: 'safeApp',
        isInternal: true,
        manifest: app.manifest,
        methods: app
    },
    {
        name: 'safeMutableData',
        isInternal: true,
        manifest: mdata.manifest,
        methods: mdata
    }
  ];
