const app = require('./app');
const cipherOpt = require('./cipher_opt');
const mdata = require('./mutable_data');
const imdata = require('./immutable_data');
const mdata_entries = require('./mutable_data_entries');
const mdata_keys = require('./mutable_data_keys');
const mdata_values = require('./mutable_data_values');

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
        name: 'safeImmutableData',
        isInternal: true,
        manifest: imdata.manifest,
        methods: imdata
    },
    {
        name: 'safeMutableData',
        isInternal: true,
        manifest: mdata.manifest,
        methods: mdata
    },
    {
        name: 'safeMutableDataEntries',
        isInternal: true,
        manifest: mdata_entries.manifest,
        methods: mdata_entries
    },
    {
        name: 'safeMutableDataKeys',
        isInternal: true,
        manifest: mdata_keys.manifest,
        methods: mdata_keys
    },
    {
        name: 'safeMutableDataValues',
        isInternal: true,
        manifest: mdata_values.manifest,
        methods: mdata_values
    },
  ];
