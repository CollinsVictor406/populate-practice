// models/Like.js
const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({

  // who liked
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  // which post
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }

}, { timestamps: true });

module.exports = mongoose.model("Like", likeSchema);