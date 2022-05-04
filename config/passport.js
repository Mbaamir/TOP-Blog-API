const userModel = require("../models/user");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.jwtSecret,
};

const strategy = new JwtStrategy(options, (payload, done) => {
  userModel
    .findOne({ username: payload.sub })
    .then((user) => {r
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