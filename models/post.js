const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    _postId: Schema.Types.ObjectId,
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    body: {
      type: String,
      required: true,
      minLength: 100,
      maxLength: 1000,
      trim: true,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model('post',postSchema);