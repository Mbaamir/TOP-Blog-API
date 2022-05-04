const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const secretOrKey = process.env.JwtSecret;
const userController = require("../controllers/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Users");
});

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    res.status(200).json({ success: true, message: "You are Authorized!" });
  }
);

// router.post(
//   "/register",
//   passport.authenticate("register", { session: false }, (err) => {
//     if (err) res.sendStatus(400);
//   }),
//   async (req, res, next) => {
//     res.status(201).json({
//       message: "Signup successful",
//       username: req.user,
//     });
//   }
// );

router.post("/register", userController.registerUser);

router.post("/login", async (req, res, next) => {
  passport.authenticate(
    "login",
    { session: false },
    async (err, user, info) => {
      try {
        if (err || !user) {
          console.log(err, "err");
          const error = new Error("An error occurred.");
          return next(error);
        }

        req.logIn(user, { session: false }, async (error) => {
          if (error) return next(error);

          const body = { _userId: user._userId, username: user.username };
          const token = jwt.sign({ user: body }, secretOrKey);

          return res.status(200).json({ token });
        });
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
});

module.exports = router;
