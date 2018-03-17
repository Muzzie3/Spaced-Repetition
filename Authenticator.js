const { OAuth2Client } = require("google-auth-library");
const clientSecret = process.env.GOOGLE_OAUTH_SECRET || require("./secrets").OAuthSecret;

const client = new OAuth2Client(
  "857722859858-btnq198t91ks85cs0gbvtkeckg8reha1.apps.googleusercontent.com",
  clientSecret,
);
module.exports.Authenticate = (tokenString, callback) =>
  client.verifyIdToken({ idToken: tokenString }, (err, login) => callback(login.getPayload().sub));
