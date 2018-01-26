const { OAuth2Client } = require("google-auth-library");
const clientSecret = require("./secrets").OAuth;

const client = new OAuth2Client(
  "857722859858-btnq198t91ks85cs0gbvtkeckg8reha1.apps.googleusercontent.com",
  clientSecret,
);
module.exports.OAuth = (tokenString, callback) =>
  client.verifyIdToken({ idToken: tokenString }, (err1, login) => callback(login.getPayload().sub));
