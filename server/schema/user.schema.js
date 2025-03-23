const mongoose = require("mongoose");

const userSchema = () => {
  mongoose.Schema({
    user: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
  });
};

module.exports = userSchema;
