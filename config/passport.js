const fs = require("fs");

const user = require("mongoose").model("user");

const passport = require('passport');
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.jwtSecret,
};

const strategy = new JwtStrategy(options, (payload, done) => {
  user
    .findOne({ username: payload.sub })
    .then((user) => {
      if (user) {
        console.log(user, "user Found");
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch((err) => done(err, null));
});

// TODO
module.exports = (passport) => {
  passport.use(strategy)
};