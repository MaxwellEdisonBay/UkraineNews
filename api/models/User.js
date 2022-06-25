const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },

    id: {
      type: String,
      unique: true,
    },

    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,

    profilePhoto: {
      type: String,
    },
    group: {
      type: String,
      required: false,
      unique: false,
      default: "user",
    },
    source: { type: String, required: [true, "source not specified"] },
    lastVisited: { type: Date, default: new Date() },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
