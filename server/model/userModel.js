const mongoose = require("mongoose");
const userSchema = require("../schema/user.schema.js");

module.exports = mongoose.model("User", userSchema,"user-model");
