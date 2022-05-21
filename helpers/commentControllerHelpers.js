const mongoose = require("mongoose");
const commentModel = require("../models/comment");
const postModel = require("../models/post");
const userModel = require("../models/user");

exports.doesUserAndPostExist = async function (
  commentingUser,
  commentedPost,
  parentComment = false
) {
  let parentCommentPromise = false;
  let commentedPostPromise = null;

  let commentingUserPromise = userModel
    .findOne({ username: commentingUser })
    .exec();

  if (commentedPost.match(/^[0-9a-fA-F]{24}$/)) {
    commentedPostPromise = postModel.findById(commentedPost).exec();
  }

  if (parentComment) {
    parentCommentPromise = null;
    if (parentComment.match(/^[0-9a-fA-F]{24}$/)) {
      parentCommentPromise = commentModel.findById(parentComment).exec();
    }
  }

  const val = await Promise.all([
    commentingUserPromise,
    commentedPostPromise,
    parentCommentPromise,
  ]);

  let commentObject = {
    commentingUser: val[0],
    commentedPost: val[1],
    parentComment: val[2],
  };

  return commentObject;
};
