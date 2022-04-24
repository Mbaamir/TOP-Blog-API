var express = require("express");
var router = express.Router();
let user = require("../models/user");
const passport = require("passport");
let issueJWT = require("../issueJWT");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    res.status(200).json({ success: true, message: "You are Authorized!" });
  }
);

router.post("/register", function (req, res, next) {
  const newUser = new user({
    username: req.body.username,
    password: req.body.password,
  });

  newUser
    .save()
    .then((createdUser) => {
      console.log(createdUser,"createdUser");
      res.status(201).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ err });
      next(err);
    });
});

router.post("/login", function (req, res, next) {
  user.findOne({ username: req.body.username }).then((foundUser) => {
    if (!foundUser) {
      res.status(401).json({ success: false, message: "Could not find user" });
    } else {
      console.log(foundUser,"foundUser");
      if (foundUser.password === req.body.password) {
        const jwt = issueJWT(foundUser);
        res.status(200).json({
          success: true,
          token: jwt.token,
          expires: jwt.expires,
        });
      } else {
        res.status(401).json({ success: false, message: "Incorrect Password" });
      }
    }
  });
});

module.exports = router;
