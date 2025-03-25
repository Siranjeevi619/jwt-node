const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken.js");

const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userMail = await User.findOne({ email });

    if (userMail) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    const token = generateToken({ email, role });
    return res
      .status(201)
      .json({ message: "user registerd Successfully", accessToken: token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(400).json({
      message: "Invalid Credientials",
    });
  }
  const token = generateToken({ email: user.email, role: user.role });
  return res
    .status(200)
    .json({ message: "user logged Successfully", accessToken: token });
};

module.exports = { signup, signin };
