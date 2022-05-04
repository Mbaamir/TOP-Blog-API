const res = require("express/lib/response");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const userModel = require("../models/user");

// passport.use(
//   "register",
//   new localStrategy(
//     {
//       session: false,
//     },
//     async (username, password, done) => {
//       try {
//         const user = await userModel.create({ username, password });
//         return done(null, user);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );

passport.use(
  "login",
  new localStrategy(
    {
      session: false,
    },
    async (username, password, done) => {
      try {
        const user = await userModel.findOne({ username });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);
