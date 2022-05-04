const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    _commentId: Schema.Types.ObjectId,
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    post: { type: Schema.Types.ObjectId, ref: "post", required: true },
    comment: [this],
    body: {
      type: String,
      required: true,
      minLength: 50,
      maxLength: 500,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment", commentSchema);
