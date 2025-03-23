require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connectDb = require("./data/db.js");

const app = express();
const PORT = process.env.PORT || 7000;
connectDb();
app.use(express.json());
app.use(cors());

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: { type: String, default: "user" },
});

const User = mongoose.model("User", userSchema, "user-jwt-schema");

const createToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};



app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = "Bearer " + createToken(user);

  res.json({
    message: "Login successful",
    token: token,
    user,
  });
});

app.get("/api/user", async (req, res) => {
  const token = req.header("Authorization");
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User authenticated", user });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

app.get("/api/admin", async (req, res) => {
  const token = req.header("Authorization");
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Admins only" });
    }

    res.json({ message: "Welcome Admin", user });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
