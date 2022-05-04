const res = require("express/lib/response");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const userModel = require("../models/user");

passport.use(
  "login",
  new localStrategy(
    {
      session: false,
    },
    async (username, password, done) => {
      try {
        const foundUser = await userModel.findOne({ username });
        console.log(foundUser,"foundUser");

        if (!foundUser) {
          console.log("not foundUser");
          return done(null, false, { message: "User not found" });
        }
    
        const validate = await foundUser.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, foundUser, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);
