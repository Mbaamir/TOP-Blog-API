const express = require("express");
const router = express.Router();
const passport = require("passport");
const commentController = require("../controllers/commentController");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  commentController.createComment
);

router.get("/", async (req, res, next) => {
  res.sendStatus(200);
});

module.exports = router;
