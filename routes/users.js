const express = require("express");
const router = express.Router();
const passport = require("passport");
const issueJwt = require("../auth/issueJWT");
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

router.post("/register", userController.registerUser);

router.post("/login", async (req, res, next) => {
  passport.authenticate(
    "login",
    { session: false },
    async (err, user, info) => {
      if (!user) {
        console.log(info, "info");
        return res.sendStatus(400);
      }
      try {
        console.log(info, "info");
        const token = issueJwt(user);
        return res.status(200).json({ token });
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
});

module.exports = router;
