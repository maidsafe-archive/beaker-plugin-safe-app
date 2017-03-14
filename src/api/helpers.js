const crypto = require('crypto'); // electron deps will be avaible inside browser

const genRandomToken = () => (crypto.randomBytes(32).toString('hex'));

module.exports.genRandomToken = genRandomToken;

module.exports.addObjToMap = (map, obj) => {
  const randToken = genRandomToken();
  map.set(randToken, obj);
  return randToken;
}
