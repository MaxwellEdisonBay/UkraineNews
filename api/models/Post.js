const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: false,
    },
    text: {
      type: String,
      required: true,
      unique: false,
    },
    thumbnail: {
      type: String,
      required: false,
      unique: false,
    },
    username: {
      type: String,
      required: true,
      unique: false,
    },
    categories: {
      type: Array,
      required: false,
      unique: false,
    },
    userID: {
      type: String,
      required: true,
      unique: false,
    },
    media: {
      type: Array,
      required: false,
      unique: false,
    },
    acceptedBy: {
      type: String,
      required: false,
      unique: false,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
