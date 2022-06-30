const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: String,
    text: String,
    thumbnail: String,
    username: String,
    categories: Array,
    userID: String,
    media: {
      type: Array,
      default: null,
    },
    acceptedBy: {
      type: String,
      required: false,
      unique: false,
      default: null,
    },
    rejectedBy: {
      type: String,
      required: false,
      unique: false,
      default: null,
    },
    reviewedAt: {
      type: Date,
    },
    source: {
      type: String,
      default: "author",
    },
    sourcePostUrl: String,
    sourceId: String,
    telegramGroupedId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
