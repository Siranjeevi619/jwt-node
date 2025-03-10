const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const router = require("./router/auth.router");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 8000;
dotenv.config();

connectDB();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is currently running on port ${process.env.PORT}`);
});
