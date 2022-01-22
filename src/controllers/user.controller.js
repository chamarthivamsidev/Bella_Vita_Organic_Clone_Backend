const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user.model");

const router = express.Router();

router.post("/createUser", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword,
    });
    const result = await user.save();
    // const { password, ...data } = await result.toJSON();
    // res.send(data);
    res.send({ status: true });
  } catch (err) {
    res.send({ status: false, error });
  }
});

router.post("/login", async (req, res) => {
  try {
    let username = req.body.email.trim();
    let pwd = req.body.password.trim();
    const user = await User.findOne({ email: username });
    if (!user) {
      res.send({
        status: false,
        error: "please enter email correctly and try again",
      });
    }
    if (!(await bcrypt.compare(pwd, user.password))) {
      res.send({
        status: false,
        error: "please enter password correctly and try again",
      });
    }
    const details = {
      first_name: user.first_name,
      last_name: user.last_name,
      user_id: user._id,
      email: user.email,
    };
    res.send({
      status: true,
      details,
    });
  } catch (err) {
    res.send({ status: false, message: err.messgae });
  }
});



module.exports = router;
