const app = require('./app');
const cipherOpt = require('./cipher_opt');
const mdata = require('./mutable_data');
const imdata = require('./immutable_data');

module.exports = [
    {
        name: 'safeApp',
        isInternal: true,
        manifest: app.manifest,
        methods: app
    },
    {
        name: 'safeCipherOpt',
        isInternal: true,
        manifest: cipherOpt.manifest,
        methods: cipherOpt
    },
    {
        name: 'safeMutableData',
        isInternal: true,
        manifest: mdata.manifest,
        methods: mdata
    },
    {
        name: 'safeImmutableData',
        isInternal: true,
        manifest: imdata.manifest,
        methods: imdata
    }
  ];
