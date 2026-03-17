// models/Comment.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: String,

  // reference to user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  // reference to post
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);