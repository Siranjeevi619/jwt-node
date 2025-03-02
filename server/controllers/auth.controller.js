const bcrypt = require("bcrypt");

const User = require("../models/auth.model.js");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.js");

const signinpage = async (req, res) => {
  const { name, phone, email, password } = req.body;

  try {
    const emailFound = await User.findOne({ userMail: email });
    if (emailFound) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      userName: name,
      userPhone: phone,
      userMail: email,
      userPassword: hashedPassword,
    });
    await newUser.save();
    const payload = { id: newUser._id };
    const token = jwt.sign(payload, config.key, { expiresIn: "1h" });
    return res.status(201).json({ message: "Registered successfully", token });
  } catch (e) {
    console.error(e.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginpage = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ userMail: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.userPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const payload = { id: user._id };
    const token = jwt.sign(payload, config.key, { expiresIn: "1h" });

    return res.status(200).json({
      message: "Login successful",
      token, 
      user: {
        id: user._id,
        name: user.userName,
        email: user.userMail,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signinpage, loginpage };
