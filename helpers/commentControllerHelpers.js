const mongoose = require("mongoose");
const commentModel = require("../models/comment");
const postModel = require("../models/post");
const userModel = require("../models/user");

exports.doesUserAndPostExist = async function (
  commentingUser,
  commentedPost,
  parentComment = false
) {
  let commentedPostPromise = null;

  let commentingUserPromise = userModel
    .findOne({ username: commentingUser })
    .exec();

  if (commentedPost.match(/^[0-9a-fA-F]{24}$/)) {
    commentedPostPromise = postModel.findById(commentedPost).exec();
  }

  const val = await Promise.all([commentingUserPromise, commentedPostPromise]);

  let commentObject = {
    commentingUser: val[0],
    commentedPost: val[1],
  };

  if (parentComment) {
    if (parentComment.match(/^[0-9a-fA-F]{24}$/)) {
      let parentCommentDocument = null;

      let found = await commentModel.findById(parentComment);
      if (found) {
        parentCommentDocument = found;
        commentObject = {
          ...commentObject,
          parentComment: parentCommentDocument,
        };
        return commentObject;
      }
    }
  } else {
    return commentObject;
  }
};
