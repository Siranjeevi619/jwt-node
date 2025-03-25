require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connectDb = require("./data/db.js");
const router = require("./router/user.router.js");

const app = express();
const PORT = process.env.PORT || 7000;
connectDb();
app.use(express.json());
app.use(cors());

app.use("/api", router);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
