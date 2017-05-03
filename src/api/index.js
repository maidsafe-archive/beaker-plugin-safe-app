const app = require('./app');
const cipherOpt = require('./cipher_opt');
const imdata = require('./immutable_data');
const crypto = require('./crypto');
const cryptoKeyPair = require('./crypto_key_pair');
const cryptoSecEncKey = require('./crypto_secret_encryption_key');
const cryptoPubEncKey = require('./crypto_public_encryption_key');
const cryptoSignKey = require('./crypto_sign_key');
const mdata = require('./mutable_data');
const mdataEntries = require('./mutable_data_entries');
const mdataKeys = require('./mutable_data_keys');
const mdataValues = require('./mutable_data_values');
const mdataMutation = require('./mutable_data_mutation');
const mdataPermissions = require('./mutable_data_permissions');
const mdataPermissionsSet = require('./mutable_data_permissions_set');
const nfs = require('./emulations/nfs');

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
    name: 'safeCrypto',
    isInternal: true,
    manifest: crypto.manifest,
    methods: crypto
  },
  {
    name: 'safeCryptoKeyPair',
    isInternal: true,
    manifest: cryptoKeyPair.manifest,
    methods: cryptoKeyPair
  },
  {
    name: 'safeCryptoSecEncKey',
    isInternal: true,
    manifest: cryptoSecEncKey.manifest,
    methods: cryptoSecEncKey
  },
  {
    name: 'safeCryptoPubEncKey',
    isInternal: true,
    manifest: cryptoPubEncKey.manifest,
    methods: cryptoPubEncKey
  },
  {
    name: 'safeCryptoSignKey',
    isInternal: true,
    manifest: cryptoSignKey.manifest,
    methods: cryptoSignKey
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
    manifest: mdataEntries.manifest,
    methods: mdataEntries
  },
  {
    name: 'safeMutableDataKeys',
    isInternal: true,
    manifest: mdataKeys.manifest,
    methods: mdataKeys
  },
  {
    name: 'safeMutableDataValues',
    isInternal: true,
    manifest: mdataValues.manifest,
    methods: mdataValues
  },
  {
    name: 'safeMutableDataMutation',
    isInternal: true,
    manifest: mdataMutation.manifest,
    methods: mdataMutation
  },
  {
    name: 'safeMutableDataPermissions',
    isInternal: true,
    manifest: mdataPermissions.manifest,
    methods: mdataPermissions
  },
  {
    name: 'safeMutableDataPermissionsSet',
    isInternal: true,
    manifest: mdataPermissionsSet.manifest,
    methods: mdataPermissionsSet
  },
  {
    name: 'safeNfs',
    isInternal: true,
    manifest: nfs.manifest,
    methods: nfs
  }
];
