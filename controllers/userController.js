var bcrypt = require("bcryptjs");
let userModel = require("../models/user");
let issueJWT = require("../issueJWT");

// router.get(
//   "/protected",
//   passport.authenticate("jwt", { session: false }),
//   function (req, res, next) {
//     res.status(200).json({ success: true, message: "You are Authorized!" });
//   }
// );

exports.registerUser = function (req, res, next) {
  bcrypt.hash("somePassword", 10, (err, hashedPassword) => {
    // if err, do something
    // otherwise, store hashedPassword in DB
    const createdUser = new userModel({
      username: req.body.username,
      password: hashedPassword,
    }).save((err) => {
      if (err) {
        console.log(err, "error saving");
        res.sendStatus(400);
      } else {
        console.log("Created User");
        res.sendStatus(201);
      }
    });
  });
};
