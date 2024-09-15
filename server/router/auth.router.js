const express = require("express");
const { signinpage, loginpage } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signinpage", signinpage);

//login

router.post("/loginpage", loginpage);

module.exports = router;
