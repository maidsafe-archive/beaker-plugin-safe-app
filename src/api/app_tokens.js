var app_tokens = new Array();

module.exports.addApp = (app) => {
  let token = '57'; // FIXME: create random tokens
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
