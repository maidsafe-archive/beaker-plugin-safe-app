const crypto = require('crypto'); // electron deps will be available inside browser

module.exports.genRandomString = () => (crypto.randomBytes(32).toString('hex'));
