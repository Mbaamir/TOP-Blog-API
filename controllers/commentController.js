const mongoose = require("mongoose");
const commentModel = require("../models/comment");
const postModel = require("../models/post");
const userModel = require("../models/user");
const commentControllerHelpers = require("../helpers/commentControllerHelpers");

exports.createComment = async function (req, res, next) {
  const username = req.body.username;
  const post = req.body.post;
  const parentComment = req.body.parentComment;
  console.log({ username });
  let foundUserPostAndComment =
    await commentControllerHelpers.doesUserAndPostExist(
      username,
      post,
      parentComment
    );

  // if(!foundUserPostAndComment[0] || !foundUserPostAndComment[0] ||)


  res.json(foundUserPostAndComment);

  // try {
  //     const createdComment = new commentModel({
  //       user: foundUser,
  //       body: req.body.postBody,
  //     }).save((err) => {
  //       if (err) {
  //         console.log(err, "error Saving created post");
  //         res.status(400).json({ err });
  //       } else {
  //         console.log("Created post");
  //         res.sendStatus(201);
  //       }
  //     });
  // } catch (err) {
  //   console.log(err, "Error Creating Post");
  //   res.status(500).json({ err });
  // }
};
