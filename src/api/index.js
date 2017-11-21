const app = require('./app');
const cipherOpt = require('./cipher_opt');
const imdata = require('./immutable_data');
const crypto = require('./crypto');
const cryptoEncKeyPair = require('./crypto_encryption_key_pair');
const cryptoSecEncKey = require('./crypto_secret_encryption_key');
const cryptoPubEncKey = require('./crypto_public_encryption_key');
const cryptoSignKeyPair = require('./crypto_sign_key_pair');
const cryptoPubSignKey = require('./crypto_public_sign_key');
const cryptoSecSignKey = require('./crypto_secret_sign_key');
const mdata = require('./mutable_data');
const mdataEntries = require('./mutable_data_entries');
const mdataMutation = require('./mutable_data_mutation');
const mdataPermissions = require('./mutable_data_permissions');
const nfs = require('./emulations/nfs');
const nfsFile = require('./emulations/nfs_file');

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
    name: 'safeCryptoSignKeyPair',
    isInternal: true,
    manifest: cryptoSignKeyPair.manifest,
    methods: cryptoSignKeyPair
  },
  {
    name: 'safeCryptoPubSignKey',
    isInternal: true,
    manifest: cryptoPubSignKey.manifest,
    methods: cryptoPubSignKey
  },
  {
    name: 'safeCryptoSecSignKey',
    isInternal: true,
    manifest: cryptoSecSignKey.manifest,
    methods: cryptoSecSignKey
  },
  {
    name: 'safeCryptoEncKeyPair',
    isInternal: true,
    manifest: cryptoEncKeyPair.manifest,
    methods: cryptoEncKeyPair
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
    name: 'safeNfs',
    isInternal: true,
    manifest: nfs.manifest,
    methods: nfs
  },
  {
    name: 'safeNfsFile',
    isInternal: true,
    manifest: nfsFile.manifest,
    methods: nfsFile
  }
];
