var app_tokens = new Array();

const minRange = Math.pow(2, 8);
const maxRange = Math.pow(2, 9) - 1;

// FIXME: perhaps use a different algo for this
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.addApp = (app) => {
  let token = getRandomInt(minRange, maxRange);
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
