const crypto = require('crypto'); // electron deps will be avaible inside browser

const genRandomToken = () => (crypto.randomBytes(32).toString('hex'));

var app_tokens = new Array(); //FIXME: maybe use some other type of container like a hashmap

module.exports.addApp = (app) => {
  let token = genRandomToken();
  app_tokens[token] = app;
  return token;
}

module.exports.getApp = (app_token) => {
  let app = app_tokens[app_token];
  if (app) {
    return Promise.resolve(app);
  }
  return Promise.reject("Invalid application token");
}
