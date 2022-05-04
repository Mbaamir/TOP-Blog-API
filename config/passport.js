const userModel = require("../models/user");

const PassportJwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.jwtSecret,
};

const jwtStrategy = new PassportJwtStrategy(options, (payload, done) => {
  userModel
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
  passport.use(jwtStrategy)
};