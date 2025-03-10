const bcrypt = require("bcrypt");

const User = require("../models/auth.model.js");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.js");
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    let existingUser = await User.findOne({ userMail: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      userName: name,
      userMail: email,
      userPassword: hashedPassword,
    });

    await newUser.save();

    // Generate JWT token
    const payload = { id: newUser._id };
    const token = jwt.sign(payload, config.key, { expiresIn: "1m" }); // Token valid for 1 minute

    // Set token in an HTTP-only cookie
    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // Set `true` in production with HTTPS
        maxAge: 60 * 1000, // 1 minute expiry
      })
      .json({
        message: "User registered successfully",
        token,
        user: {
          id: newUser._id,
          name: newUser.userName,
          email: newUser.userMail,
        },
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
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
    const token = jwt.sign(payload, config.key, { expiresIn: "10s" });

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 10 * 1000,
      })
      .json({
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

const profile = async (req, res) => {
  const user = await User.findOne({ userName: req.body.name }).select(
    "-password"
  );
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ message: `Welcome, ${user.username}!`, user });
};

module.exports = { signup, login };
