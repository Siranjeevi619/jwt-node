const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const router = require("./router/auth.router");

const app = express();
const PORT = 8000;

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", router);

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello steve" });
});

app.listen(PORT, () => {
  console.log(`Server is currently running on port ${PORT}`);
});
