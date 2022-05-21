const mongoose = require("mongoose");
const commentModel = require("../models/comment");
const commentControllerHelpers = require("../helpers/commentControllerHelpers");

exports.createComment = async function (req, res, next) {
  const username = req.body.username;
  const post = req.body.post;
  const comment = req.body.parentComment;

  let  {commentingUser,
  commentedPost,
  parentComment } = await commentControllerHelpers.doesUserAndPostExist(
      username,
      post,
      comment
    );
    
  if( !commentingUser || !commentedPost || parentComment === null ){
    res.sendStatus(400);
  }
  else{
    // res.json(foundUserPostAndComment);
  
  try {
      const createdComment = new commentModel({
        user: commentingUser,
        post: commentedPost,
        ...(parentComment ? comment: parentComment), 
        body: req.body.commentBody,
      }).save((err) => {
        if (err) {
          console.log(err, "error Saving created comment");
          res.status(400).json({ err });
        } else {
          console.log("Created comment");
          res.sendStatus(201);
        }
      });
  } catch (err) {
    console.log(err, "Server Error Creating comment");
    res.status(500).json({ err });
  }
}
};
  
