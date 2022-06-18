const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: false,
      unique: false,
    },
    name: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    profile_pic: {
      type: String,
      default: "",
    },
    googleCred: {
      type: String,
      required: false,
      unique: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
