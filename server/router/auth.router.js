const express = require("express");
// const { signinpage, loginpage } = require("../controllers/auth.controller");
const { signup, login } = require("../controllers/auth.controller.js");
const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

module.exports = router;
