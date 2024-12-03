const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    emailid: {
      type: String,
      match: /.+\@.+\..+/,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
    },
    age: {
      type: Number,
      min: 18,
    },
    phone: {
      type: Number,
      match: /^[0-9]{10}$/,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
