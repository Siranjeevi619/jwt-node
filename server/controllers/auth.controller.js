const express = require("express");
const mongoose = require("mongoose");

const User = require("../models/auth.model.js");
const { JsonWebTokenError } = require("jsonwebtoken");
const jsonwebtoken = require("jsonwebtoken");

const signinpage = async (req, res) => {
  const { name, phone, email, password } = req.body;
  try {
    const newUser = new User({
      userName: name,
      userPhone: phone,
      userMail: email,
      userPassword: password,
    });
    const user = await newUser.save();
    return res.status(200).json({ user });
  } catch (e) {
    console.error(e.message);
    return res.status(400).json({ message: e.message });
  }
};

const loginpage = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLogin = await User.findOne({
      userMail: email,
      userPassword: password,
    });

    console.log(userLogin);
    if (userLogin) {
      const token = jsonwebtoken.sign(
        {
          mail: userLogin.userMail,
          password: userLogin.userPassword,
        },
        "asdfasdf"
      );
      console.log(token);
      return res.status(200).json({ token });
    }
    // return res.status(202).json({ userLogin });
    if (userLogin) {
      return res.status(200).json({ userLogin });
    }
    return res.status(404).json({ user: userLogin });
  } catch (e) {
    console.error(e.message);
    // return res.status(500).json({ message: e.message });
  }
};

module.exports = { signinpage, loginpage };
