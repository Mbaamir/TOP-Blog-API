const jsonwebtoken = require("jsonwebtoken");

function issueJwt(user) {
  const username = user.username;
  const expiresIn = "1d";

  const payload = {
    sub: username,
    iat: Date.now(),
  };

  const secret = process.env.JwtSecret;

  const signedToken = jsonwebtoken.sign(payload, secret, {
    expiresIn: expiresIn,
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}

module.exports = issueJwt;