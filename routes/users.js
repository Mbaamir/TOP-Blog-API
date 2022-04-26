var express = require("express");
var bcrypt = require("bcryptjs");
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
  if (req.body.username && req.body.password) {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err)
        res.status(500).json({
          success: false,
          message: "Something went wrong while creating the user",
        });

      const newUser = new user({
        username: req.body.username,
        password: hashedPassword,
      });

      newUser
        .save()
        .then((createdUser) => {
          console.log(createdUser, "createdUser");
          res.status(201).json({ success: true });
        })
        .catch((err) => {
          res.status(400).json({ err });
          next(err);
        });
    });
  } else res.status(400).json({ success: false, message: "Username or password missing" });
});

function validatePassword(storedUser, givenPassword, routeRes) {
  bcrypt.compare(givenPassword, storedUser.password).then(function (result) {
    if (result) {
      console.log(result, "match");
      const jwt = issueJWT(storedUser)
      routeRes.status(200).json({
        success: true,
        token: jwt.token,
        expires: jwt.expires
      });
    } else {
      console.log(null, "not found");
      routeRes.status(401).json({
        match: false,
        message: "incorrect password",
      });
    }
  });
}

router.post("/login", function (req, res, next) {
  user.findOne({ username: req.body.username }).then((foundUser) => {
    if (!foundUser) {
      res.status(401).json({ success: false, message: "Could not find user" });
    } else {
      console.log(foundUser, "foundUser");
      validatePassword(foundUser, req.body.password,res);
    }
  });
});

module.exports = router;
