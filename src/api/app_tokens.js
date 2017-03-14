const addObjToMap = require('./helpers').addObjToMap;

var app_tokens = new Map();

module.exports.newApp = (app) => addObjToMap(app_tokens, app);

module.exports.getApp = (app_token) => {
  let app = app_tokens.get(app_token);
  if (app) {
    return Promise.resolve(app);
  }
  return Promise.reject("Invalid application token");
}
