const userModel = require("../model/userModel");

const generateToken = require("../utils/generateToken.js");

const signup = async (req, res) => {
  const { email, password, role } = req.body;
  const userMail = await User.findOne({ email });

  if (!userMail) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword, role });
  await newUser.save();
  const token = generateToken({ email, role });
  return res
    .status(201)
    .json({ message: "user registerd Successfully", accessToken: token });
};

const signin = async (req, res) => {
  const { email, role, password } = req.body;
  const user = await userModel.find({ email: email });
  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status.json({
      message: "Invalid Credientials",
    });
  }

  

  return res
    .status(200)
    .json({ message: "user logged Successfully", accessToken: token });
};

module.exports = { signup };
