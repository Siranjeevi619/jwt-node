const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const JwtAuth = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  userMail: {
    type: String,
    required: true,
    unique: true,
  },
  userPhone: {
    type: Number,
    required: true,
    unique: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
});

const User = model("User", JwtAuth);

module.exports = User;
