const express = require("express");
const router = express.Router();
const passport = require("passport");
const postController = require("../controllers/postController");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postController.createPost
);

router.get("/", async (req, res, next) => {
  res.sendStatus(200);
});

module.exports = router;
